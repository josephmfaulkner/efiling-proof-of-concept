import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when relationship-to-beneficiary's filingPetitionFor === 'spouse'. Content verbatim from myUSCIS_Pages/I-130/41_AdditionalProofOfMarriage. */
export const additionalProofOfMarriageStep: StepSchema = {
  id: 'additional-proof-of-marriage',
  section: 'Evidence',
  title: 'Additional Proof of Marriage',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'Upload one or more of the following types of documentation that may prove you have a bona fide marriage:' },
    {
      type: 'list',
      items: [
        'Documentation showing joint ownership of property',
        'A lease showing joint tenancy of a common residence, meaning you both live at the same address together',
        'Documentation showing that you and your spouse have combined your financial resources',
        'Birth certificates of children born to you and your spouse together',
        'Affidavits sworn to or affirmed by third parties having personal knowledge of the bona fides of the marital relationship. Each affidavit must contain the full name and address of the person making the affidavit; date and place of birth of the person making the affidavit; and complete information and details explaining how the person acquired his or her knowledge of your marriage',
        'Any other relevant documentation to establish that there is an ongoing marital union',
      ],
    },
    {
      type: 'paragraph',
      text: 'Note: You must submit clear and convincing evidence that you and your spouse entered into marriage in good faith and not for immigration purposes if you married your spouse while your spouse was the subject of an exclusion, deportation, removal, or rescission proceeding (including during the judicial review of any one of these proceedings); or you are a lawful permanent resident that obtained your permanent residence through a prior marriage that was not determined by the death of your spouse and you are filing your petition for your spouse that you were married within five years of obtaining your permanent residence.',
    },
  ],
  fields: [{ name: 'additionalProofOfMarriageFile', label: 'File requirements', type: 'file' }],
};
