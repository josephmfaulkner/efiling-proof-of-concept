/**
 * A form's steps/fields are described as data (this file's shapes), never as
 * hand-written components. The generic renderer (components/fields) and the
 * Zod builder (buildZodSchema.ts) both consume this shape — adding a field to
 * a step is a metadata edit under src/forms/**, not a change here.
 */

export type FieldType =
  | 'text'
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

export interface StepSchema {
  /** Also the XState state id and the wizard's :stepId route param. */
  id: string;
  title: string;
  description?: string;
  /** Read-only body content shown before any fields. A step with content and no fields is a pure informational page (no validation, just a Continue button). */
  content?: ContentBlock[];
  fields: FieldSchema[];
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
