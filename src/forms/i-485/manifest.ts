import type { FormManifest } from '../../engine/schema/types';
import { i485Steps } from './steps';

export const i485Manifest: FormManifest = {
  id: 'i-485',
  title: 'Form I-485, Application to Register Permanent Residence or Adjust Status',
  shortTitle: 'I-485 Adjustment of Status',
  description:
    'Part 1 (Information About You) and the start of Part 2 (Application Type), wired end to end into a real, fillable I-485 PDF.',
  pdfTemplatePath: '/forms/i-485/template.pdf',
  steps: i485Steps,
};
