import type { StepSchema } from '../../../engine/schema/types';

/** Visible when beneficiary-marital-status's beneficiaryMaritalStatus is not 'single'. Content verbatim from myUSCIS_Pages/I-130/38_EvidenceOfTheEndOfYourSpousesPriorMarriage. */
export const evidenceEndOfSpousesPriorMarriageStep: StepSchema = {
  id: 'evidence-end-of-spouses-prior-marriage',
  section: 'Evidence',
  title: "Evidence of the End of Your Spouse's Prior Marriage(s)",
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: "If your spouse was previously married, upload documents showing that your spouse's prior marriage(s) were legally terminated. Make sure the text is readable. Some examples include:" },
    { type: 'list', items: ['Divorce decree(s)', 'Annulment(s)', 'Death certificate(s)'] },
  ],
  fields: [{ name: 'evidenceEndOfSpousesPriorMarriageFile', label: 'File requirements', type: 'file' }],
};
