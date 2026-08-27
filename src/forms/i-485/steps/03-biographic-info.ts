import type { StepSchema } from '../../../engine/schema/types';

export const biographicInfoStep: StepSchema = {
  id: 'biographic-info',
  title: 'Biographic Information',
  description: 'Form I-485, Part 1, Items 3, 6, and 7.',
  fields: [
    { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', constraints: { required: true } },
    {
      name: 'hasOtherDobUsed',
      label: 'Have you ever used any other date of birth?',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'sex',
      label: 'Sex',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'F', label: 'Female' },
        { value: 'M', label: 'Male' },
      ],
    },
    { name: 'cityOfBirth', label: 'City or Town of Birth', type: 'text', constraints: { required: true, maxLength: 40 } },
    { name: 'countryOfBirth', label: 'Country of Birth', type: 'text', constraints: { required: true, maxLength: 40 } },
  ],
};
