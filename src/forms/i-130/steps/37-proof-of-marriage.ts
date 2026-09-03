import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when relationship-to-beneficiary's filingPetitionFor === 'spouse'. Content verbatim from myUSCIS_Pages/I-130/36_ProofOfMarriage. */
export const proofOfMarriageStep: StepSchema = {
  id: 'proof-of-marriage',
  section: 'Evidence',
  title: 'Proof of Marriage',
  visibleWhen: { event: 'showStep' },
  content: [{ type: 'paragraph', text: 'Upload a copy of your marriage certificate.' }],
  fields: [{ name: 'proofOfMarriageFile', label: 'File requirements', type: 'file' }],
};
