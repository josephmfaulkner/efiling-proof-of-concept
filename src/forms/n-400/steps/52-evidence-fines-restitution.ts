import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when crimes-and-offenses-1's everArrested === 'Y'. */
export const evidenceFinesRestitutionStep: StepSchema = {
  id: 'evidence-fines-restitution',
  section: 'Evidence',
  title: 'Fine, Restitutions, and Wage Garnishments',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'If you have ever been ordered to pay a fine, make restitution, or have your wages garnished, you must provide:' },
    { type: 'list', items: ['Documentation of the order to pay a fine, restitution, or garnish wages', 'Documentation that you have paid the required sum or evidence of current payment'] },
  ],
  fields: [{ name: 'evidenceFinesRestitutionFile', label: 'File requirements', type: 'file' }],
};
