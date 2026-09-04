import type { StepSchema } from '../../../engine/schema/types';

export const beneficiaryMaritalStatusStep: StepSchema = {
  id: 'beneficiary-marital-status',
  section: "Beneficiary's Family",
  title: "Beneficiary's Marital Status",
  fields: [
    {
      name: 'beneficiaryMaritalStatus',
      label: "What is your beneficiary's current marital status?",
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
    { name: 'beneficiaryTimesMarried', label: 'How many times has your beneficiary been married?', type: 'integer', constraints: { required: true, min: 0 } },
  ],
};
