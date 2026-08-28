import type { StepSchema } from '../../../engine/schema/types';

export const citizenshipIdentifiersStep: StepSchema = {
  id: 'citizenship-identifiers',
  section: 'About You',
  title: 'Citizenship & Identifiers',
  description: 'Form I-485, Part 1, Items 8, 4/9, and 19.',
  fields: [
    {
      name: 'countryOfCitizenship',
      label: 'Country of Citizenship or Nationality',
      type: 'text',
      constraints: { required: true, maxLength: 40 },
    },
    {
      name: 'aNumber',
      label: 'Alien Registration Number (A-Number), if any',
      type: 'aNumber',
      helpText: 'Leave blank if you have never been issued one.',
    },
    {
      name: 'uscisOnlineAccountNumber',
      label: 'USCIS Online Account Number, if any',
      type: 'text',
      constraints: { maxLength: 12 },
    },
    {
      name: 'hasSsnIssued',
      label: 'Has the Social Security Administration ever officially issued a Social Security card to you?',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'ssn',
      label: 'U.S. Social Security Number (SSN)',
      type: 'ssn',
      visibleWhen: { event: 'showField' },
    },
  ],
};
