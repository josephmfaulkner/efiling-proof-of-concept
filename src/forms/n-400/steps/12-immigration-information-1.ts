import type { StepSchema } from '../../../engine/schema/types';

export const immigrationInformationOneStep: StepSchema = {
  id: 'immigration-information-1',
  section: 'About You',
  title: 'Your Immigration Information — Page 1',
  fields: [
    { name: 'countryOfCitizenship', label: 'What is your country of citizenship or nationality?', type: 'text' },
    { name: 'notLawfulPermanentResident', label: 'I am not a lawful permanent resident of the United States.', type: 'checkbox' },
    { name: 'datePermanentResident', label: 'If you are a lawful permanent resident, when did you become a lawful permanent resident?', type: 'date' },
    { name: 'noANumber', label: 'I do not have or know my A-Number.', type: 'checkbox' },
    { name: 'aNumber', label: 'What is your A-Number?', type: 'aNumber' },
  ],
};
