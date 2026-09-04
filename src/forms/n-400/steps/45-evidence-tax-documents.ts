import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when tax-information's oweTaxes === 'Y'. */
export const evidenceTaxDocumentsStep: StepSchema = {
  id: 'evidence-tax-documents',
  section: 'Evidence',
  title: 'Tax Documents',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'Tax transcripts are not required for every case. If you have any Federal, state, or local taxes that are overdue, provide:' },
    {
      type: 'list',
      items: [
        'IRS tax transcripts for the past 5 years (3 years if filing on the basis of marriage to a U.S. citizen)',
        'A signed agreement from the IRS or state or local tax office showing you have filed a tax return and arranged to pay the taxes you owe',
        'Documentation showing the current status of your repayment program',
      ],
    },
  ],
  fields: [{ name: 'evidenceTaxDocumentsFile', label: 'File requirements', type: 'file' }],
};
