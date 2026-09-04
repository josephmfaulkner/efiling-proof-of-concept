import type { StepSchema } from '../../../engine/schema/types';

/** Real page uses a repeating "Add" list of crime/offense entries; simplified to a single most-recent entry, matching the same scope decision used for every other repeating group in this app. Visible when either crimes-and-offenses-1 question is Yes. */
export const crimesAndOffensesTwoStep: StepSchema = {
  id: 'crimes-and-offenses-2',
  section: 'Moral Character',
  title: 'Crimes and Offenses — Page 2',
  visibleWhen: { event: 'showStep' },
  description: 'Provide information about all your crimes and offenses in the United States or anywhere in the world, including any that have been expunged or for which you received a pardon, and any that happened before you reached 18 years of age.',
  fields: [
    { name: 'crimeDescription', label: 'What was the crime or offense?', type: 'text' },
    { name: 'crimeDate', label: 'Date of arrest, citation, or charge', type: 'date' },
    { name: 'crimeCity', label: 'City or town where it occurred', type: 'text' },
    { name: 'crimeState', label: 'State or country where it occurred', type: 'text' },
    { name: 'crimeOutcome', label: 'Outcome (for example, charges dismissed, convicted, sentenced, probation)', type: 'text' },
  ],
};
