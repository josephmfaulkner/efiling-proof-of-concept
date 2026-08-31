import type { StepSchema } from '../../../engine/schema/types';

export const yourContactInformationStep: StepSchema = {
  id: 'your-contact-information',
  section: 'About You',
  title: 'Your Contact Information',
  fields: [
    { name: 'daytimePhoneCountryCode', label: 'Daytime telephone number — Country code', type: 'text' },
    { name: 'daytimePhoneNumber', label: 'Daytime telephone number — Phone number', type: 'text' },
    { name: 'mobilePhoneCountryCode', label: 'Mobile telephone number (if any) — Country code', type: 'text' },
    { name: 'mobilePhoneNumber', label: 'Mobile telephone number (if any) — Phone number', type: 'text' },
    { name: 'emailAddress', label: 'Email address (if any)', type: 'text', helpText: 'Example: user@domain.com' },
    { name: 'mailingInCareOf', label: 'In care of name (if any)', type: 'text' },
    { name: 'mailingCountry', label: 'Country', type: 'text', constraints: { required: true } },
    { name: 'mailingAddressLine1', label: 'Address line 1', type: 'text', constraints: { required: true }, helpText: 'Street number and name' },
    { name: 'mailingAddressLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
    { name: 'mailingCity', label: 'City or town', type: 'text', constraints: { required: true } },
    { name: 'mailingState', label: 'State', type: 'text', constraints: { required: true } },
    { name: 'mailingZip', label: 'ZIP code', type: 'text', constraints: { required: true }, helpText: 'Provide a 5 or 9-digit ZIP code.' },
    {
      name: 'isMailingEqualToPhysical',
      label: 'Is your current mailing address the same as your physical address?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
};
