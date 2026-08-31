import type { StepSchema } from '../../../engine/schema/types';

export const yourParentsOneStep: StepSchema = {
  id: 'your-parents-1',
  section: 'Your Family',
  title: 'Your Parents — Page 1',
  description: 'What is the full name of parent 1?',
  fields: [
    { name: 'parentOneFirstName', label: 'Given name (first name)', type: 'text' },
    { name: 'parentOneMiddleName', label: 'Middle name', type: 'text' },
    { name: 'parentOneLastName', label: 'Family name (last name)', type: 'text' },
    { name: 'parentOneDateOfBirth', label: 'What is their date of birth?', type: 'date' },
    {
      name: 'parentOneGender',
      label: 'What is their gender?',
      type: 'radio',
      options: [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
      ],
    },
    { name: 'parentOneCountryOfBirth', label: 'What is their country of birth?', type: 'text' },
    { name: 'parentOneCityOfResidence', label: 'What is their city/town/village of residence?', type: 'text' },
    { name: 'parentOneCountryOfResidence', label: 'What is their country of residence?', type: 'text' },
  ],
};
