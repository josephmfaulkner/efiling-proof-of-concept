import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when crimes-and-offenses-1's committedNotArrested === 'Y'. */
export const evidenceArrestsWithoutChargesStep: StepSchema = {
  id: 'evidence-arrests-without-charges',
  section: 'Evidence',
  title: 'Arrests Without Charges',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'If you have ever been arrested or detained anywhere in the world and NO CHARGES WERE FILED, you must provide:' },
    { type: 'list', items: ['An arrest report', 'An official statement from the arresting agency or applicable court confirming that no charges were filed'] },
    { type: 'paragraph', text: 'If any of the required records are unavailable, provide original or certified confirmation that the record is not available. You must bring originals or court-certified copies to your interview.' },
  ],
  fields: [{ name: 'evidenceArrestsWithoutChargesFile', label: 'File requirements', type: 'file' }],
};
