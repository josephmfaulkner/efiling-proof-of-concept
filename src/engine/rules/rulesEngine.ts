import { useEffect, useState } from 'react';
import { Engine } from 'json-rules-engine';
import type { FormManifest } from '../schema/types';
import type { RuleDocument, RuleEventParams } from './types';

export interface RuleEvaluationResult {
  visibleSteps: Set<string>;
  visibleFields: Set<string>;
  requiredFields: Set<string>;
  activeEvidence: Set<string>;
}

/**
 * A repeating group's whole entry list is gated on `RepeatingGroupSchema.visibleWhen`
 * exactly like a normal field's `visibleWhen` — folding its `answerKey` in here as a
 * pseudo-field is what lets a rule reveal e.g. the "trips" list only once
 * `hasTraveledOutsideUs` is Yes, reusing the existing showField event rather than a
 * second visibility mechanism.
 */
function fieldsIncludingRepeating(step: FormManifest['steps'][number]) {
  if (!step.repeating) return step.fields;
  return [...step.fields, { name: step.repeating.answerKey, visibleWhen: step.repeating.visibleWhen } as const];
}

function emptyResult(manifest: FormManifest): RuleEvaluationResult {
  return {
    visibleSteps: new Set(manifest.steps.filter((s) => !s.visibleWhen).map((s) => s.id)),
    visibleFields: new Set(
      manifest.steps
        .flatMap(fieldsIncludingRepeating)
        .filter((f) => !f.visibleWhen)
        .map((f) => f.name),
    ),
    requiredFields: new Set(),
    activeEvidence: new Set(),
  };
}

/**
 * Runs a form's rule document against the accumulated answers ("facts") and
 * reduces whatever events fire into the sets the wizard/evidence screens
 * need. `visibleSteps`/`visibleFields` always include every step/field that
 * has no `visibleWhen` at all — conditional ones only join once their rule's
 * event has actually fired for the current facts.
 */
export async function evaluateRules(
  ruleDocument: RuleDocument,
  manifest: FormManifest,
  facts: Record<string, unknown>,
): Promise<RuleEvaluationResult> {
  const engine = new Engine(ruleDocument.rules, { allowUndefinedFacts: true });
  const { events } = await engine.run(facts);

  const shownSteps = new Set<string>();
  const shownFields = new Set<string>();
  const requiredFields = new Set<string>();
  const activeEvidence = new Set<string>();

  for (const event of events) {
    const params = (event.params ?? {}) as RuleEventParams;
    switch (event.type) {
      case 'showStep':
        params.stepIds?.forEach((id) => shownSteps.add(id));
        break;
      case 'showField':
        params.fieldNames?.forEach((name) => shownFields.add(name));
        break;
      case 'requireField':
        params.fieldNames?.forEach((name) => requiredFields.add(name));
        break;
      case 'requireEvidence':
        params.evidenceItems?.forEach((key) => activeEvidence.add(key));
        break;
    }
  }

  return {
    visibleSteps: new Set(
      manifest.steps.filter((s) => !s.visibleWhen || shownSteps.has(s.id)).map((s) => s.id),
    ),
    visibleFields: new Set(
      manifest.steps
        .flatMap(fieldsIncludingRepeating)
        .filter((f) => !f.visibleWhen || shownFields.has(f.name))
        .map((f) => f.name),
    ),
    requiredFields,
    activeEvidence,
  };
}

/** Live, render-friendly wrapper around evaluateRules for in-step conditional field reveal. */
export function useRuleEvaluation(
  ruleDocument: RuleDocument,
  manifest: FormManifest,
  facts: Record<string, unknown>,
): RuleEvaluationResult {
  const [result, setResult] = useState<RuleEvaluationResult>(() => emptyResult(manifest));

  useEffect(() => {
    let cancelled = false;
    evaluateRules(ruleDocument, manifest, facts).then((next) => {
      if (!cancelled) setResult(next);
    });
    return () => {
      cancelled = true;
    };
    // facts is an object literal recreated every render; stringify to dep-check by content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ruleDocument, manifest, JSON.stringify(facts)]);

  return result;
}
