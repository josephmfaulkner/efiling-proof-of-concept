import type { StepSchema } from '../../../engine/schema/types';

/** immigrationStatus here is the branch gate for step 12a (citizen) vs 12b (LPR) — see i130.rules.json. */
export const additionalInformationStep: StepSchema = {
  id: 'additional-information-about-you',
  section: 'About You',
  title: 'Additional Information',
  fields: [
    {
      name: 'immigrationStatus',
      label: 'What is your current immigration status?',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'citizen', label: 'I am a US Citizen' },
        { value: 'lpr', label: 'I am a Lawful Permanent Resident' },
      ],
    },
    {
      name: 'gainedStatusThroughAdoption',
      label: 'Did you gain lawful permanent resident status or citizenship through adoption?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'noANumber',
      label: 'I do not have or know my A-Number.',
      type: 'checkbox',
      helpText: 'The A-Number is a 7 to 9-digit immigration file number that begins with an "A". If you do not have one, USCIS may assign one to you.',
    },
    { name: 'aNumber', label: 'What is your A-Number?', type: 'aNumber' },
    {
      name: 'noUscisOnlineAccountNumber',
      label: 'I do not have or know my USCIS Online Account Number.',
      type: 'checkbox',
      helpText: 'You will only have an Online Account Number (OAN) if you previously filed a form with a receipt number that begins with IOE.',
    },
    { name: 'uscisOnlineAccountNumber', label: 'What is your USCIS Online Account Number?', type: 'text', constraints: { maxLength: 12 } },
    { name: 'noSsn', label: 'I do not have or know my U.S. Social Security number.', type: 'checkbox' },
    { name: 'ssn', label: 'What is your U.S. Social Security number?', type: 'ssn' },
    { name: 'dateOfBirth', label: 'What is your date of birth?', type: 'date', constraints: { required: true } },
    { name: 'countryOfBirth', label: 'What is your country of birth?', type: 'text' },
    { name: 'cityOfBirth', label: 'What is your city, town, or village of birth?', type: 'text' },
  ],
};
