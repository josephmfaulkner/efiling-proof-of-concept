import type { FormManifest } from '../../engine/schema/types';
import { n400Steps } from './steps';

export const n400Manifest: FormManifest = {
  id: 'n-400',
  title: 'Form N-400, Application for Naturalization',
  shortTitle: 'N-400 Application for Naturalization',
  description:
    'The full guided-filing flow — Getting Started, About You, Your Family, Moral Character, Attachment to the U.S. Constitution, Oath of Allegiance, and Evidence — modeled on the real myUSCIS N-400 experience and wired end to end into a real, fillable N-400 PDF.',
  pdfTemplatePath: '/forms/n-400/template.pdf',
  steps: n400Steps,
};
