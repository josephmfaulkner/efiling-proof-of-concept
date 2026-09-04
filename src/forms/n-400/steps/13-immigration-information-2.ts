import type { StepSchema } from '../../../engine/schema/types';

export const immigrationInformationTwoStep: StepSchema = {
  id: 'immigration-information-2',
  section: 'About You',
  title: 'Your Immigration Information — Page 2',
  fields: [
    {
      name: 'wantsSsnCard',
      label: 'Do you want the Social Security Administration (SSA) to issue you an original or replacement Social Security card and update your immigration status with the SSA if and when you are naturalized?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'authorizesSsaDisclosure',
      label: 'Do you authorize disclosure of information from this application and USCIS systems to the SSA as required for the purpose of assigning you an SSN, issuing you a Social Security card, and updating your immigration status with the SSA?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    { name: 'noSsn', label: 'I do not have or know my U.S. Social Security number.', type: 'checkbox' },
    { name: 'ssn', label: 'What is your U.S. Social Security number (SSN)?', type: 'ssn' },
    { name: 'noUscisOnlineAccountNumber', label: 'I do not have or know my USCIS Online Account Number.', type: 'checkbox' },
    { name: 'uscisOnlineAccountNumber', label: 'What is your USCIS Online Account Number?', type: 'text', constraints: { maxLength: 12 } },
  ],
};
