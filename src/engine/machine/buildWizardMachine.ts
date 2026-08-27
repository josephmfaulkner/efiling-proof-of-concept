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

export type WizardEvent =
  | { type: 'SUBMIT_STEP'; stepId: string; values: Record<string, unknown>; ruleResult: RuleEvaluationResult }
  | { type: 'BACK' }
  | { type: 'GOTO'; stepId: string };

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
 * per-form logic. Rules-engine evaluation itself happens *outside* the
 * machine (XState v5 guards must run synchronously; json-rules-engine's
 * `engine.run()` is async), so `WizardStepView` evaluates rules once per
 * step submit and sends the result inside SUBMIT_STEP; guards here only ever
 * read the already-computed `context.visibleSteps`.
 */
export function buildWizardMachine(manifest: FormManifest) {
  const stepIds = manifest.steps.map((s) => s.id);

  function forwardTransitions(fromIndex: number) {
    const laterStepIds = stepIds.slice(fromIndex + 1);
    return [
      ...laterStepIds.map((id) => ({
        target: id,
        guard: { type: 'stepIsVisible' as const, params: { stepId: id } },
        actions: 'recordStepAndRules' as const,
      })),
      { target: 'complete', actions: 'recordStepAndRules' as const },
    ];
  }

  function backwardTransitions(fromIndex: number) {
    const earlierStepIdsDescending = stepIds.slice(0, fromIndex).reverse();
    return [
      ...earlierStepIdsDescending.map((id) => ({
        target: id,
        guard: { type: 'stepIsVisible' as const, params: { stepId: id } },
      })),
      { target: stepIds[0] },
    ];
  }

  function gotoTransitions() {
    return stepIds.map((id) => ({
      target: id,
      guard: { type: 'stepIsVisible' as const, params: { stepId: id } },
    }));
  }

  return setup({
    types: {} as {
      context: WizardContext;
      events: WizardEvent;
    },
    guards: {
      // For a SUBMIT_STEP event, sibling transitions' guards are all evaluated against
      // context as it stood *before* this event — recordStepAndRules hasn't assigned the
      // fresh ruleResult into context yet when the guard runs, only after a transition is
      // chosen. Verified by hand-testing XState directly: reading context.visibleSteps here
      // is always one submission stale, which silently skipped a step that should have
      // just become visible. Reading event.ruleResult instead uses this submission's
      // just-computed result; BACK/GOTO carry no fresh result, so they fall back to context
      // (accurate for them, since no rule evaluation happens on those events).
      stepIsVisible: ({ context, event }, params: { stepId: string }) =>
        event.type === 'SUBMIT_STEP' ? event.ruleResult.visibleSteps.has(params.stepId) : context.visibleSteps.has(params.stepId),
    },
    actions: {
      recordStepAndRules: assign(({ context, event }) => {
        if (event.type !== 'SUBMIT_STEP') return {};
        return {
          answers: { ...context.answers, ...event.values },
          visibleSteps: event.ruleResult.visibleSteps,
          visibleFields: event.ruleResult.visibleFields,
          requiredFields: event.ruleResult.requiredFields,
          activeEvidence: event.ruleResult.activeEvidence,
        };
      }),
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
      ...Object.fromEntries(
        stepIds.map((id, i) => [
          id,
          {
            on: {
              SUBMIT_STEP: forwardTransitions(i),
              ...(i > 0 ? { BACK: backwardTransitions(i) } : {}),
              GOTO: gotoTransitions(),
            },
          },
        ]),
      ),
      // Not `type: 'final'` — Review/Download need GOTO/BACK to keep working from here for edits.
      complete: {
        on: {
          GOTO: gotoTransitions(),
          BACK: backwardTransitions(stepIds.length),
        },
      },
    },
  });
}

export type WizardMachine = ReturnType<typeof buildWizardMachine>;
