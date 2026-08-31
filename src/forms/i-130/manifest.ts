import type { FormManifest } from '../../engine/schema/types';
import { i130Steps } from './steps';

export const i130Manifest: FormManifest = {
  id: 'i-130',
  title: 'Form I-130, Petition for Alien Relative',
  shortTitle: 'I-130 Petition for Alien Relative',
  description:
    'The full guided-filing flow — Getting Started, About You, Your Family, Your Beneficiary, and Other Information — modeled on the real myUSCIS I-130 experience and wired end to end into a real, fillable I-130 PDF.',
  pdfTemplatePath: '/forms/i-130/template.pdf',
  steps: i130Steps,
};
