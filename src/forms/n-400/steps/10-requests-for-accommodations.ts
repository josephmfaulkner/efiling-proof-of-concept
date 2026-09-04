import type { StepSchema } from '../../../engine/schema/types';

export const requestsForAccommodationsStep: StepSchema = {
  id: 'requests-for-accommodations',
  section: 'About You',
  title: 'Requests for Accommodations',
  fields: [
    {
      name: 'hasDisability',
      label: 'Do you have a physical or developmental disability or mental impairment that prevents you from demonstrating your knowledge and understanding of the English language or civics requirements for naturalization?',
      type: 'radio',
      helpText: 'Your disability must have affected you for at least 1 year or be expected to last longer than 1 year. You cannot qualify for a disability exception based on illiteracy.',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
};
