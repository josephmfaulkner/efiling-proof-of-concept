import type { RuleDocument } from '../../engine/rules/types';
import rawRules from './rules/i485.rules.json';

export { i485Manifest as manifest } from './manifest';
export { i485PdfMapping as pdfMapping } from './pdfMapping';
export { i485EvidenceCatalog as evidenceCatalog } from './evidence/evidenceCatalog';
export const rules = rawRules as RuleDocument;
