import type { StepSchema } from '../../../engine/schema/types';

/** Visible when marital-status's maritalStatus is not 'single'. Content verbatim from myUSCIS_Pages/I-130/37_EvidenceOfTheEndOfYourPriorMarriage. */
export const evidenceEndOfYourPriorMarriageStep: StepSchema = {
  id: 'evidence-end-of-your-prior-marriage',
  section: 'Evidence',
  title: 'Evidence of the End of Your Prior Marriage(s)',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'Upload documents showing that your prior marriage(s) were legally terminated. Make sure the text is readable. Some examples include:' },
    { type: 'list', items: ['Divorce decree(s)', 'Annulment(s)', 'Death certificate(s)'] },
  ],
  fields: [{ name: 'evidenceEndOfYourPriorMarriageFile', label: 'File requirements', type: 'file' }],
};
