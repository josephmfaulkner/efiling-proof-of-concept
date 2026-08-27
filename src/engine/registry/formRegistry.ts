import type { FormManifest } from '../schema/types';
import type { RuleDocument } from '../rules/types';
import type { PdfMappingDocument } from '../pdf/types';
import type { EvidenceCatalog } from '../evidence/types';

export interface RegisteredForm {
  manifest: FormManifest;
  rules: RuleDocument;
  pdfMapping: PdfMappingDocument;
  evidenceCatalog: EvidenceCatalog;
}

const registry = new Map<string, RegisteredForm>();

/**
 * The entire cross-cutting footprint of adding a new form: one call here
 * from src/forms/index.ts. Nothing under src/engine/ changes.
 */
export function registerForm(entry: RegisteredForm) {
  registry.set(entry.manifest.id, entry);
}

export function getForm(formId: string): RegisteredForm {
  const entry = registry.get(formId);
  if (!entry) throw new Error(`Unknown form id: "${formId}". Is it registered in src/forms/index.ts?`);
  return entry;
}

export function listForms(): FormManifest[] {
  return [...registry.values()].map((entry) => entry.manifest);
}
