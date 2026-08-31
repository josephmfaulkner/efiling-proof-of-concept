import { setup, assign } from 'xstate';
import type { FormManifest } from '../schema/types';
import type { RuleEvaluationResult } from '../rules/rulesEngine';

export interface WizardContext {
  answers: Record<string, unknown>;
  visibleSteps: Set<string>;
  visibleFields: Set<string>;
  requiredFields: Set<string>;
  activeEvidence: Set<string>;
}

/**
 * Every navigation action — Next, Back, a sidebar click, a Review "Edit" —
 * funnels through this one event. It always merges whatever the current
 * step's form holds into `answers` and carries a just-recomputed rule
 * evaluation, regardless of whether the target step is "further along" than
 * the current one — this is what lets the sidebar jump to any visible step
 * in any order without losing in-progress edits. Static or rule-driven field
 * *validity* is deliberately not checked here: this app defers "have you
 * filled in every mandatory field" entirely to Review/Download (see
 * engine/validation/validateAnswers.ts), matching the real myUSCIS product —
 * free navigation while editing, a hard check only at submission time.
 */
export type WizardEvent = {
  type: 'NAVIGATE';
  stepId: string;
  values: Record<string, unknown>;
  ruleResult: RuleEvaluationResult;
};

function initialVisibleSteps(manifest: FormManifest): Set<string> {
  return new Set(manifest.steps.filter((s) => !s.visibleWhen).map((s) => s.id));
}

function initialVisibleFields(manifest: FormManifest): Set<string> {
  return new Set(
    manifest.steps
      .flatMap((s) => s.fields)
      .filter((f) => !f.visibleWhen)
      .map((f) => f.name),
  );
}

/**
 * Builds one state per step id, purely from manifest.steps — nothing here is
 * per-form logic. Every state (including 'complete', so Review edits keep
 * working) accepts the exact same NAVIGATE transition set: any step, or
 * 'complete', guarded only by the target's rule-driven visibility. There is
 * no forward/backward distinction at the machine level anymore — "Next" and
 * "Back" are just the view layer picking a target id before sending NAVIGATE
 * (see stepNavigation.ts and WizardStepView).
 */
export function buildWizardMachine(manifest: FormManifest) {
  const stepIds = manifest.steps.map((s) => s.id);

  const navigateTransitions = [
    ...stepIds.map((id) => ({
      target: id,
      guard: { type: 'stepIsVisible' as const, params: { stepId: id } },
      actions: 'recordStepAndRules' as const,
    })),
    {
      target: 'complete',
      guard: { type: 'stepIsVisible' as const, params: { stepId: 'complete' } },
      actions: 'recordStepAndRules' as const,
    },
  ];

  return setup({
    types: {} as {
      context: WizardContext;
      events: WizardEvent;
    },
    guards: {
      // Every event is NAVIGATE and always carries a freshly-computed ruleResult
      // (see WizardStepView) — no stale-context branching needed here anymore.
      // Every state offers a transition candidate for *every* step (so any of
      // them can be the target of a NAVIGATE), which means each candidate must
      // also check it's the one the event actually asked for — otherwise the
      // first candidate in the array (typically the always-visible current
      // step, self-targeting) wins regardless of what was requested. 'complete'
      // isn't a manifest step, so it isn't in visibleSteps; requesting it
      // explicitly is enough.
      stepIsVisible: ({ event }, params: { stepId: string }) =>
        event.stepId === params.stepId && (params.stepId === 'complete' || event.ruleResult.visibleSteps.has(params.stepId)),
    },
    actions: {
      recordStepAndRules: assign(({ context, event }) => ({
        answers: { ...context.answers, ...event.values },
        visibleSteps: event.ruleResult.visibleSteps,
        visibleFields: event.ruleResult.visibleFields,
        requiredFields: event.ruleResult.requiredFields,
        activeEvidence: event.ruleResult.activeEvidence,
      })),
    },
  }).createMachine({
    id: manifest.id,
    context: {
      answers: {},
      visibleSteps: initialVisibleSteps(manifest),
      visibleFields: initialVisibleFields(manifest),
      requiredFields: new Set(),
      activeEvidence: new Set(),
    },
    initial: stepIds[0],
    states: {
      ...Object.fromEntries(stepIds.map((id) => [id, { on: { NAVIGATE: navigateTransitions } }])),
      // Not `type: 'final'` — Review/Download need NAVIGATE to keep working from here for edits.
      complete: { on: { NAVIGATE: navigateTransitions } },
    },
  });
}

export type WizardMachine = ReturnType<typeof buildWizardMachine>;
