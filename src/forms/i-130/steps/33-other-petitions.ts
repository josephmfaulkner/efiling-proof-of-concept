import type { StepSchema } from '../../../engine/schema/types';

/** Single-entry simplification of the real repeating "Save entry" / "Cancel" list — see 08-your-address-history.ts. */
export const otherPetitionsStep: StepSchema = {
  id: 'other-petitions',
  section: 'Other Information',
  title: 'Other Petitions',
  description: "What is your relative's full legal name?",
  fields: [
    { name: 'otherPetitionRelativeFirstName', label: 'Given name (first name)', type: 'text', constraints: { required: true } },
    { name: 'otherPetitionRelativeMiddleName', label: 'Middle name', type: 'text' },
    { name: 'otherPetitionRelativeLastName', label: 'Family name (last name)', type: 'text', constraints: { required: true } },
    { name: 'otherPetitionRelationship', label: 'What is your relationship to this relative?', type: 'text', constraints: { required: true } },
  ],
};
