import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when additional-information-about-you's immigrationStatus === 'lpr'. Content verbatim from myUSCIS_Pages/I-130/35_ProofOfLawfulPermanentResidenceStatus. */
export const proofOfLprStatusStep: StepSchema = {
  id: 'proof-of-lpr-status',
  section: 'Evidence',
  title: 'Proof of Lawful Permanent Resident Status',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'Upload an image of both sides of your Permanent Resident Card (I-551) (formerly known as the Alien Registration Card or Green Card).' },
    { type: 'paragraph', text: 'Make sure all text is clear and readable. If you have not yet received your card, submit copies of your passport biographic page and the page showing admission as a lawful permanent resident, or other evidence of permanent resident status issued by USCIS or the former INS.' },
  ],
  fields: [{ name: 'proofOfLprStatusFile', label: 'File requirements', type: 'file' }],
};
