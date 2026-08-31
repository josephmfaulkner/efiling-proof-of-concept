import type { StepSchema } from '../../../engine/schema/types';

/** filingPetitionFor drives evidence rules — spouse relationships trigger the I-130A supplemental evidence item. */
export const relationshipToBeneficiaryStep: StepSchema = {
  id: 'relationship-to-beneficiary',
  section: 'Your Beneficiary',
  title: 'Relationship to Beneficiary',
  fields: [
    {
      name: 'filingPetitionFor',
      label: 'For whom are you filing this petition?',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'spouse', label: 'Spouse' },
        { value: 'parent', label: 'Parent' },
        { value: 'sibling', label: 'Brother or Sister' },
        { value: 'child', label: 'Child' },
      ],
    },
    {
      name: 'hasPriorPetition',
      label: 'Has anyone else ever filed a petition for the beneficiary?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
        { value: 'unknown', label: 'Unknown' },
      ],
    },
  ],
};
