import type { StepSchema } from '../../../engine/schema/types';

export const mockFormSteps: StepSchema[] = [
  {
    id: 'petitioner-info',
    title: 'Petitioner Information',
    description: 'Synthetic demo form — proves a second form needs no engine changes, only this directory.',
    fields: [
      { name: 'petitionerFamilyName', label: 'Family Name (Last Name)', type: 'text', constraints: { required: true } },
      { name: 'petitionerGivenName', label: 'Given Name (First Name)', type: 'text', constraints: { required: true } },
      {
        name: 'relationshipType',
        label: 'Relationship to Beneficiary',
        type: 'select',
        constraints: { required: true },
        options: [
          { value: 'Spouse', label: 'Spouse' },
          { value: 'Parent', label: 'Parent' },
          { value: 'Child', label: 'Child' },
          { value: 'Sibling', label: 'Sibling' },
        ],
      },
    ],
  },
  {
    id: 'beneficiary-info',
    title: 'Beneficiary Information',
    fields: [
      { name: 'beneficiaryFamilyName', label: 'Family Name (Last Name)', type: 'text', constraints: { required: true } },
      { name: 'beneficiaryGivenName', label: 'Given Name (First Name)', type: 'text', constraints: { required: true } },
    ],
  },
];
