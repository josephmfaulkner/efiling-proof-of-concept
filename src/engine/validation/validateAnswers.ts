import type { FieldSchema, FormManifest, StepSchema } from '../schema/types';
import type { RuleEvaluationResult } from '../rules/rulesEngine';

export interface MissingField {
  step: StepSchema;
  field: FieldSchema;
}

/** Same "is this answer actually filled in" check used at every layer that cares — free navigation means this is the only place requiredness is ever enforced. */
export function isAnswerMissing(field: FieldSchema, value: unknown): boolean {
  if (field.type === 'file') return !(value instanceof File);
  if (field.type === 'checkbox') return value !== true;
  return value === undefined || value === null || value === '';
}

/**
 * The single place "have you filled in everything mandatory" gets decided —
 * used by both the Review page (to render per-section alerts) and the
 * Download page (to block PDF generation). Free navigation means no step
 * can enforce this on its own anymore, so it only ever runs once, over the
 * full accumulated answers, against a *fresh* rule evaluation (never the
 * possibly-stale snapshot) — a field only counts if both its step and the
 * field itself are currently visible.
 */
export function findMissingRequiredFields(
  manifest: FormManifest,
  answers: Record<string, unknown>,
  ruleResult: RuleEvaluationResult,
): MissingField[] {
  const missing: MissingField[] = [];
  for (const step of manifest.steps) {
    if (!ruleResult.visibleSteps.has(step.id)) continue;
    for (const field of step.fields) {
      if (!ruleResult.visibleFields.has(field.name)) continue;
      const isRequired = Boolean(field.constraints?.required) || ruleResult.requiredFields.has(field.name);
      if (!isRequired) continue;
      if (isAnswerMissing(field, answers[field.name])) {
        missing.push({ step, field });
      }
    }
  }
  return missing;
}
