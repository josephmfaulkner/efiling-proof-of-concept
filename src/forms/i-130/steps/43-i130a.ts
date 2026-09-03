import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when relationship-to-beneficiary's filingPetitionFor === 'spouse'. Content verbatim from myUSCIS_Pages/I-130/42_I130A. */
export const i130aStep: StepSchema = {
  id: 'i130a',
  section: 'Evidence',
  title: 'Supplemental Information for Spouse Beneficiary (I-130A)',
  visibleWhen: { event: 'showStep' },
  content: [
    {
      type: 'paragraph',
      text: 'If you are filing for your spouse, he or she must complete and sign the Supplemental Information for Spouse Beneficiary (I-130A). If your spouse is overseas, the I-130A must still be completed, but your spouse does not have to sign the I-130A.',
    },
  ],
  fields: [{ name: 'i130aFile', label: 'File requirements', type: 'file' }],
};
