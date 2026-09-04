import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when crimes-and-offenses-1's everArrested === 'Y'. */
export const evidenceArrestsWithChargesStep: StepSchema = {
  id: 'evidence-arrests-with-charges',
  section: 'Evidence',
  title: 'Arrests With Charges',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'If you have ever been arrested or detained anywhere in the world, and CHARGES WERE FILED, you must provide:' },
    { type: 'list', items: ['Documentation of all arrest reports, charging documents, court dispositions, sentencing reports, and any other relevant documents', 'Any additional evidence concerning the circumstances of your arrests or convictions'] },
    { type: 'paragraph', text: 'If you were sentenced to jail or prison or received an alternative sentence or probation, you must also provide evidence to show that you completed it. You must bring originals or court-certified copies to your interview.' },
  ],
  fields: [{ name: 'evidenceArrestsWithChargesFile', label: 'File requirements', type: 'file' }],
};
