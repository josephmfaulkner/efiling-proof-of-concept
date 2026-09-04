import type { StepSchema } from '../../../engine/schema/types';

export const yourContactInformationStep: StepSchema = {
  id: 'your-contact-information',
  section: 'About You',
  title: 'Your Contact Information',
  fields: [
    { name: 'daytimePhone', label: 'Daytime telephone number', type: 'text', helpText: 'Provide a 10-digit phone number.' },
    { name: 'mobilePhoneSameAsDaytime', label: 'This is the same as my daytime telephone number.', type: 'checkbox' },
    { name: 'mobilePhone', label: 'Mobile telephone number (if any)', type: 'text', helpText: 'Provide a 10-digit phone number.' },
    { name: 'emailAddress', label: 'Email address (if any)', type: 'text', helpText: 'Example: user@domain.com' },
    { name: 'physicalInCareOf', label: 'In care of name (if any)', type: 'text' },
    { name: 'physicalCountry', label: 'Country', type: 'text', constraints: { required: true } },
    { name: 'physicalAddressLine1', label: 'Address line 1', type: 'text', constraints: { required: true }, helpText: 'Street number and name' },
    { name: 'physicalAddressLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
    { name: 'physicalCity', label: 'City or town', type: 'text', constraints: { required: true } },
    { name: 'physicalState', label: 'State', type: 'text', constraints: { required: true } },
    { name: 'physicalZip', label: 'ZIP code', type: 'text', constraints: { required: true }, helpText: 'Provide a 5 or 9-digit ZIP code.' },
    { name: 'physicalFromDate', label: 'When did you move here? — From (MM/DD/YYYY)', type: 'date' },
    { name: 'mailingSameAsPhysical', label: 'This is the same as my current physical address.', type: 'checkbox' },
    { name: 'mailingInCareOf', label: 'In care of name (if any)', type: 'text' },
    { name: 'mailingCountry', label: 'Country', type: 'text' },
    { name: 'mailingAddressLine1', label: 'Address line 1', type: 'text', helpText: 'Street number and name' },
    { name: 'mailingAddressLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
    { name: 'mailingCity', label: 'City or town', type: 'text' },
    { name: 'mailingState', label: 'State', type: 'text' },
    { name: 'mailingZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
  ],
};
