import type { StepSchema } from '../../../engine/schema/types';

export const yourParentsTwoStep: StepSchema = {
  id: 'your-parents-2',
  section: 'Your Family',
  title: 'Your Parents — Page 2',
  description: 'What is the full name of parent 2?',
  fields: [
    { name: 'parentTwoFirstName', label: 'Given name (first name)', type: 'text' },
    { name: 'parentTwoMiddleName', label: 'Middle name', type: 'text' },
    { name: 'parentTwoLastName', label: 'Family name (last name)', type: 'text' },
    { name: 'parentTwoDateOfBirth', label: 'What is their date of birth?', type: 'date' },
    {
      name: 'parentTwoGender',
      label: 'What is their gender?',
      type: 'radio',
      options: [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
      ],
    },
    { name: 'parentTwoCountryOfBirth', label: 'What is their country of birth?', type: 'text' },
    { name: 'parentTwoCityOfResidence', label: 'What is their city/town/village of residence?', type: 'text' },
    { name: 'parentTwoCountryOfResidence', label: 'What is their country of residence?', type: 'text' },
  ],
};
