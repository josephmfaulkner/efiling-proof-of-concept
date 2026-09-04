import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when illegal-activity-2's failedToSupportDependents === 'Y'. */
export const evidenceChildSpousalSupportStep: StepSchema = {
  id: 'evidence-child-spousal-support',
  section: 'Evidence',
  title: 'Child and Spousal Support',
  visibleWhen: { event: 'showStep' },
  content: [
    {
      type: 'paragraph',
      text: 'Provide evidence that you have complied with any child and spousal support obligations. If a court has ordered you to provide financial support for a spouse, former spouse, or children, provide the court or government order and evidence that you have complied with it. For example:',
    },
    { type: 'list', items: ['Cancelled checks or money order receipts', 'A court or agency document showing child support payments', 'Evidence of wage garnishments', 'A notarized letter from the parent or guardian who cares for your children'] },
  ],
  fields: [{ name: 'evidenceChildSpousalSupportFile', label: 'File requirements', type: 'file' }],
};
