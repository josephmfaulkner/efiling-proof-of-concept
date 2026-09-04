import type { StepSchema } from '../../../engine/schema/types';

/** Repeating list — see 08-your-address-history.ts. Not everyone has other petitions to report, so no entry is required. */
export const otherPetitionsStep: StepSchema = {
  id: 'other-petitions',
  section: 'Other Information',
  title: 'Other Petitions',
  description: "If you have filed for other relatives, provide their full legal name below.",
  fields: [],
  repeating: {
    answerKey: 'otherPetitions',
    entryNoun: 'relative',
    summaryColumnLabel: 'Relative',
    summaryFieldNames: ['otherPetitionRelativeFirstName', 'otherPetitionRelativeLastName'],
    minEntries: 0,
    fields: [
      { name: 'otherPetitionRelativeFirstName', label: 'Given name (first name)', type: 'text', constraints: { required: true } },
      { name: 'otherPetitionRelativeMiddleName', label: 'Middle name', type: 'text' },
      { name: 'otherPetitionRelativeLastName', label: 'Family name (last name)', type: 'text', constraints: { required: true } },
      { name: 'otherPetitionRelationship', label: 'What is your relationship to this relative?', type: 'text', constraints: { required: true } },
    ],
  },
};
