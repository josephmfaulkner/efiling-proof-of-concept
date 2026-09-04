import { registerForm } from '../engine/registry/formRegistry';
import * as i485 from './i-485';
import * as i130 from './i-130';
import * as n400 from './n-400';
import * as mockForm from './mock-form';

registerForm({
  manifest: i485.manifest,
  rules: i485.rules,
  pdfMapping: i485.pdfMapping,
  evidenceCatalog: i485.evidenceCatalog,
});

registerForm({
  manifest: i130.manifest,
  rules: i130.rules,
  pdfMapping: i130.pdfMapping,
  evidenceCatalog: i130.evidenceCatalog,
});

registerForm({
  manifest: n400.manifest,
  rules: n400.rules,
  pdfMapping: n400.pdfMapping,
  evidenceCatalog: n400.evidenceCatalog,
});

registerForm({
  manifest: mockForm.manifest,
  rules: mockForm.rules,
  pdfMapping: mockForm.pdfMapping,
  evidenceCatalog: mockForm.evidenceCatalog,
});
