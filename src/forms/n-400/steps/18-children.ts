import type { StepSchema } from '../../../engine/schema/types';

/** Real page is a repeating "Add a child" list, revealed once a child count is entered — see i-130/08-your-address-history.ts for the same list pattern. */
export const childrenStep: StepSchema = {
  id: 'children',
  section: 'Your Family',
  title: 'Children',
  description: 'You must indicate ALL children under 18 years of age, including children born in the U.S. or elsewhere, stepchildren, legally adopted children, and children born outside of marriage.',
  fields: [{ name: 'totalNumberOfChildren', label: 'How many children do you have?', type: 'text' }],
  repeating: {
    answerKey: 'children',
    entryNoun: 'child',
    summaryColumnLabel: 'Child',
    summaryFieldNames: ['childFirstName', 'childLastName', 'childDateOfBirth'],
    minEntries: 0,
    visibleWhen: { event: 'showField' },
    fields: [
      { name: 'childFirstName', label: "Child's given name (first name)", type: 'text' },
      { name: 'childLastName', label: "Child's family name (last name)", type: 'text' },
      { name: 'childDateOfBirth', label: "Child's date of birth", type: 'date' },
      { name: 'childCountryOfBirth', label: "Child's country of birth", type: 'text' },
    ],
  },
};
