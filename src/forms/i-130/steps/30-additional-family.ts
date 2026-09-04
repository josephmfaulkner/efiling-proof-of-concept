import type { StepSchema } from '../../../engine/schema/types';

/** Repeating list — see 08-your-address-history.ts. Not everyone has additional family to report, so no entry is required. */
export const additionalFamilyStep: StepSchema = {
  id: 'additional-family',
  section: "Beneficiary's Family",
  title: "Beneficiary's Additional Family",
  description: "If the beneficiary has a spouse or children, provide their full legal name below.",
  fields: [],
  repeating: {
    answerKey: 'additionalFamily',
    entryNoun: 'family member',
    summaryColumnLabel: 'Family Member',
    summaryFieldNames: ['additionalFamilyFirstName', 'additionalFamilyLastName'],
    minEntries: 0,
    fields: [
      { name: 'additionalFamilyFirstName', label: 'Given name (first name)', type: 'text', constraints: { required: true } },
      { name: 'additionalFamilyMiddleName', label: 'Middle name', type: 'text' },
      { name: 'additionalFamilyLastName', label: 'Family name (last name)', type: 'text', constraints: { required: true } },
      {
        name: 'additionalFamilyRelationship',
        label: 'What is their relationship to the beneficiary?',
        type: 'radio',
        constraints: { required: true },
        options: [
          { value: 'spouse', label: 'Spouse' },
          { value: 'child', label: 'Child' },
        ],
      },
      { name: 'additionalFamilyDateOfBirth', label: 'What is their date of birth?', type: 'date', constraints: { required: true } },
      { name: 'additionalFamilyCountryOfBirth', label: 'What is their country of birth?', type: 'text', constraints: { required: true } },
    ],
  },
};
