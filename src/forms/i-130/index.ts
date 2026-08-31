import type { RuleDocument } from '../../engine/rules/types';
import rawRules from './rules/i130.rules.json';

export { i130Manifest as manifest } from './manifest';
export { i130PdfMapping as pdfMapping } from './pdfMapping';
export { i130EvidenceCatalog as evidenceCatalog } from './evidence/evidenceCatalog';
export const rules = rawRules as RuleDocument;
