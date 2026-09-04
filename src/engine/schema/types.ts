/**
 * A form's steps/fields are described as data (this file's shapes), never as
 * hand-written components. The generic renderer (components/fields) and the
 * Zod builder (buildZodSchema.ts) both consume this shape — adding a field to
 * a step is a metadata edit under src/forms/**, not a change here.
 */

export type FieldType =
  | 'text'
  | 'integer'
  | 'date'
  | 'ssn'
  | 'aNumber'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'file';

export interface SelectOption {
  value: string;
  label: string;
}

export interface FieldConstraints {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  /** Regex source (no slashes/flags). */
  pattern?: string;
  patternMessage?: string;
  /** 'integer' only — inclusive numeric bounds (e.g. a weight of 30-699 lbs). */
  min?: number;
  max?: number;
}

/**
 * Ties a field or step's visibility to a rules-engine event of the same
 * `event` type (see engine/rules/types.ts). Absent = always visible/active;
 * present = hidden until evaluateRules() reports that event firing.
 */
export interface RuleRef {
  event: 'showField' | 'showStep';
}

export interface FieldSchema {
  /** Globally unique within the form. Used as the RHF field name, the rules-engine fact key, and the pdfMapping answerKey. */
  name: string;
  label: string;
  type: FieldType;
  constraints?: FieldConstraints;
  /** Required for 'select' and 'radio'. */
  options?: SelectOption[];
  placeholder?: string;
  helpText?: string;
  visibleWhen?: RuleRef;
}

/**
 * Read-only informational content, rendered above any fields by the generic
 * <StepContent> component. Every real USCIS guided-filing form opens with a
 * "Before You Start" / "Filling Out Your Form Online" pair of pure-content
 * steps (fields: []) — this is what makes those reusable across any form
 * without engine changes, only content data per form.
 */
export type ContentBlock =
  | { type: 'heading'; level?: 2 | 3 | 4; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

/**
 * Real myUSCIS pages that capture a theoretically-unlimited set of entries
 * (address history, employers, prior marriages, additional-information
 * responses, ...) all share the same UI pattern: a list of saved entries
 * with Edit/Delete, an "Add ___" button opening a per-entry form, and
 * "Save ___" / "Cancel" to return to the list (see RepeatingGroupField.tsx).
 * A step using this stores its entries as one array under `answerKey` in
 * `answers` instead of flat per-field keys, and leaves `StepSchema.fields`
 * empty — `fields` here is validated and rendered exactly like a normal
 * step's fields (same FieldSchema, same SchemaField dispatch), just once per
 * entry rather than once for the whole step.
 */
export interface RepeatingGroupSchema {
  /** Key in `answers` holding the array of saved entries. */
  answerKey: string;
  /** Fields captured per entry. */
  fields: FieldSchema[];
  /** Singular noun for UI copy: "Add {entryNoun}" / "Save {entryNoun}". */
  entryNoun: string;
  /** Summary table column header for the entry (e.g. "Address", "Employer"). */
  summaryColumnLabel: string;
  /** Field names (in order) joined into each saved entry's one-line summary. */
  summaryFieldNames: string[];
  /** Entries required before this group counts as complete on Review/Download. Default 1. */
  minEntries?: number;
  /** Same convention as FieldSchema.visibleWhen — for a group whose relevance depends on another field in the same step (e.g. trips only after answering "have you traveled" Yes). Absent = always visible. */
  visibleWhen?: RuleRef;
}

export interface StepSchema {
  /** Also the XState state id and the wizard's :stepId route param. */
  id: string;
  title: string;
  description?: string;
  /** Read-only body content shown before any fields. A step with content and no fields is a pure informational page (no validation, just a Continue button). */
  content?: ContentBlock[];
  fields: FieldSchema[];
  /** When set, this step renders as a list-of-entries + add/edit form instead of `fields` (which stays `[]`) — see RepeatingGroupField.tsx. */
  repeating?: RepeatingGroupSchema;
  visibleWhen?: RuleRef;
  /** Purely presentational grouping label for the sidebar nav (e.g. "About You"). Steps sharing a section render as one expandable group, myUSCIS-style. */
  section?: string;
}

export interface FormManifest {
  id: string;
  title: string;
  shortTitle: string;
  description?: string;
  /** Path under /public the vendored, pre-decrypted template lives at. */
  pdfTemplatePath: string;
  steps: StepSchema[];
}
