import type { StepSchema } from '../../../engine/schema/types';

/** Real page uses a repeating "Add a child" list; simplified to a total count plus one representative entry. */
export const childrenStep: StepSchema = {
  id: 'children',
  section: 'Your Family',
  title: 'Children',
  description: 'You must indicate ALL children under 18 years of age, including children born in the U.S. or elsewhere, stepchildren, legally adopted children, and children born outside of marriage.',
  fields: [
    { name: 'totalNumberOfChildren', label: 'How many children do you have?', type: 'text' },
    { name: 'childFirstName', label: "Child's given name (first name)", type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'childLastName', label: "Child's family name (last name)", type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'childDateOfBirth', label: "Child's date of birth", type: 'date', visibleWhen: { event: 'showField' } },
    { name: 'childCountryOfBirth', label: "Child's country of birth", type: 'text', visibleWhen: { event: 'showField' } },
  ],
};
