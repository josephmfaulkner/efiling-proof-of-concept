import type { StepSchema } from '../../../engine/schema/types';

export const maritalStatusStep: StepSchema = {
  id: 'marital-status',
  section: 'Your Family',
  title: 'Marital Status',
  fields: [
    {
      name: 'maritalStatus',
      label: 'What is your current marital status?',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'single', label: 'Single, Never Married' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' },
        { value: 'separated', label: 'Separated' },
        { value: 'annulled', label: 'Marriage Annulled' },
      ],
    },
    { name: 'timesMarried', label: 'How many times have you been married?', type: 'integer', constraints: { min: 0 } },
  ],
};
