import type { TopLevelCondition } from 'json-rules-engine';

/**
 * Rule documents are the one piece of form metadata authored as literal JSON
 * (not a typed .ts module) — they are exactly the "policy changes = edit a
 * JSON file, not the app" mechanism the whole engine exists to support.
 * `conditions` is json-rules-engine's own condition tree, unmodified.
 */
export type RuleEventType = 'showField' | 'requireField' | 'showStep' | 'requireEvidence';

export interface RuleEventParams {
  fieldNames?: string[];
  stepIds?: string[];
  evidenceItems?: string[];
  message?: string;
}

export interface RuleDefinition {
  name: string;
  conditions: TopLevelCondition;
  event: { type: RuleEventType; params: RuleEventParams };
  priority?: number;
}

export interface RuleDocument {
  formId: string;
  rules: RuleDefinition[];
}
