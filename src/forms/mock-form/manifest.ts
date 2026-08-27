import type { FormManifest } from '../../engine/schema/types';
import { mockFormSteps } from './steps';

export const mockFormManifest: FormManifest = {
  id: 'mock-form',
  title: 'Mock Form: Petition for Relative — synthetic demo, not an official USCIS form',
  shortTitle: 'Mock Petition (demo)',
  description: 'A minimal second form, added purely as metadata, to prove the engine generalizes beyond the I-485.',
  pdfTemplatePath: '/forms/mock-form/template.pdf',
  steps: mockFormSteps,
};
