/**
 * Declarative mapping from a form's logical answer keys to the real AcroForm
 * field names in a vendored PDF template. Every shape here exists because it
 * was observed directly on the real, decrypted I-485 template — see README.
 */

export type TextTransform = 'stripNonDigits' | 'isoDateToUsDate' | 'none';

interface BaseMapping {
  /** Matches a FieldSchema.name (see engine/schema/types.ts) — the answer key in the wizard's flat answers map. */
  answerKey: string;
}

/** One value written into one or more real text fields (repeating headers use more than one name). */
export interface TextFieldMapping extends BaseMapping {
  kind: 'text';
  pdfFieldNames: string[];
  transform?: TextTransform;
}

/** One value selected into one or more real dropdown fields. */
export interface DropdownFieldMapping extends BaseMapping {
  kind: 'dropdown';
  pdfFieldNames: string[];
  /** Logical answer value -> PDF export value, only needed when they differ. */
  valueMap?: Record<string, string>;
}

/** A single real checkbox, checked iff the answer is truthy. */
export interface CheckboxFieldMapping extends BaseMapping {
  kind: 'checkbox';
  pdfFieldNames: string[];
}

/**
 * Exactly one of several sibling checkboxes gets checked, chosen by matching
 * the answer value. Covers USCIS's "Sex" (F/M) and Yes/No question pairs,
 * which are each modeled as two independent checkboxes, not a true radio
 * group or a single boolean field.
 */
export interface CheckboxGroupMapping extends BaseMapping {
  kind: 'checkboxGroup';
  options: Array<{ matchValue: string; pdfFieldName: string }>;
}

export type PdfFieldMappingEntry =
  | TextFieldMapping
  | DropdownFieldMapping
  | CheckboxFieldMapping
  | CheckboxGroupMapping;

export interface PdfMappingDocument {
  formId: string;
  entries: PdfFieldMappingEntry[];
}
