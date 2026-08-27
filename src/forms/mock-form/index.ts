import type { RuleDocument } from '../../engine/rules/types';
import rawRules from './rules/mockForm.rules.json';

export { mockFormManifest as manifest } from './manifest';
export { mockFormPdfMapping as pdfMapping } from './pdfMapping';
export { mockFormEvidenceCatalog as evidenceCatalog } from './evidenceCatalog';
export const rules = rawRules as RuleDocument;
