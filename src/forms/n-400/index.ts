import type { RuleDocument } from '../../engine/rules/types';
import rawRules from './rules/n400.rules.json';

export { n400Manifest as manifest } from './manifest';
export { n400PdfMapping as pdfMapping } from './pdfMapping';
export { n400EvidenceCatalog as evidenceCatalog } from './evidence/evidenceCatalog';
export const rules = rawRules as RuleDocument;
