import { registerForm } from '../engine/registry/formRegistry';
import * as i485 from './i-485';
import * as mockForm from './mock-form';

registerForm({
  manifest: i485.manifest,
  rules: i485.rules,
  pdfMapping: i485.pdfMapping,
  evidenceCatalog: i485.evidenceCatalog,
});

registerForm({
  manifest: mockForm.manifest,
  rules: mockForm.rules,
  pdfMapping: mockForm.pdfMapping,
  evidenceCatalog: mockForm.evidenceCatalog,
});
