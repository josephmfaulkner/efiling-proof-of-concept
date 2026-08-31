import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when marital-status's maritalStatus === 'married'. */
export const currentSpouseStep: StepSchema = {
  id: 'current-spouse',
  section: 'Your Family',
  title: 'Current Spouse',
  visibleWhen: { event: 'showStep' },
  fields: [
    { name: 'currentSpouseFirstName', label: "What is your current spouse's legal name? — Given name (first name)", type: 'text' },
    { name: 'currentSpouseMiddleName', label: 'Middle name', type: 'text' },
    { name: 'currentSpouseLastName', label: 'Family name (last name)', type: 'text' },
    { name: 'currentSpouseMarriageDate', label: 'On what date did you marry your current spouse?', type: 'date' },
    { name: 'currentSpouseMarriageCountry', label: 'Where were you and your current spouse married? — Country', type: 'text' },
    { name: 'currentSpouseMarriageCity', label: 'City or town', type: 'text' },
    { name: 'currentSpouseMarriageState', label: 'State', type: 'text' },
    { name: 'currentSpouseDateLastMarriageEnded', label: 'When did your last marriage end?', type: 'date', helpText: 'Only applicable if you were previously married before your current spouse.' },
  ],
};
