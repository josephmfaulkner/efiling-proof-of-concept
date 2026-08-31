import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when immigration-information-1's beneficiaryHasBeenInImmigrationProceedings === 'Y'. */
export const immigrationProceedingsStep: StepSchema = {
  id: 'immigration-proceedings',
  section: 'Your Beneficiary',
  title: 'Immigration Proceedings',
  visibleWhen: { event: 'showStep' },
  description: 'You have selected that the beneficiary has been in immigration proceedings. Provide information on their immigration proceedings in this section.',
  fields: [
    {
      name: 'proceedingType',
      label: 'What type of proceedings?',
      type: 'radio',
      options: [
        { value: 'removal', label: 'Removal' },
        { value: 'rescission', label: 'Rescission' },
        { value: 'exclusion_deportation', label: 'Exclusion/Deportation' },
        { value: 'other_judicial', label: 'Other judicial proceedings' },
      ],
    },
    { name: 'proceedingCity', label: 'Where did the immigration proceedings take place? — City or Town', type: 'text' },
    { name: 'proceedingState', label: 'State', type: 'text' },
    { name: 'proceedingDate', label: 'When did the immigration proceedings take place?', type: 'date' },
  ],
};
