import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const oathOfAllegianceOneStep: StepSchema = {
  id: 'oath-of-allegiance-1',
  section: 'Oath of Allegiance',
  title: 'Oath of Allegiance — Page 1',
  fields: [
    { name: 'understandsOath', label: 'Do you understand the full Oath of Allegiance to the United States?', type: 'radio', options: YES_NO },
    {
      name: 'unableToTakeOathDueToDisability',
      label: 'Are you unable to take the Oath of Allegiance because of a physical or developmental disability or mental impairment?',
      type: 'radio',
      helpText: 'If you cannot undergo any part of the naturalization process because of a disability or impairment, you may have a legal guardian, a surrogate, or an eligible designated representative complete the process for you.',
      options: YES_NO,
    },
    { name: 'willingToTakeFullOath', label: 'Are you willing to take the full Oath of Allegiance to the United States?', type: 'radio', options: YES_NO },
  ],
};
