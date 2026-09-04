import type { StepSchema } from '../../../engine/schema/types';

export const basisOfEligibilityStep: StepSchema = {
  id: 'basis-of-eligibility',
  section: 'Getting Started',
  title: 'Basis of Eligibility',
  fields: [
    {
      name: 'basisOfEligibility',
      label: 'What is your basis of eligibility?',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'general', label: 'General provision' },
        { value: 'spouse', label: 'Spouse of a U.S. citizen' },
        { value: 'vawa', label: 'Spouse, former spouse, or child of a U.S. citizen under the Violence Against Women Act (VAWA)' },
        { value: 'spouseAbroadEmployment', label: 'Spouse of U.S. citizen in qualified employment outside the United States' },
        { value: 'militaryHostilities', label: 'Military service during a period of hostilities' },
        { value: 'militaryOneYear', label: 'At least one year of honorable military service at any time' },
        { value: 'other', label: 'Other' },
      ],
    },
    { name: 'eligibilityOtherExplain', label: 'Provide an explanation.', type: 'text', visibleWhen: { event: 'showField' } },
  ],
};
