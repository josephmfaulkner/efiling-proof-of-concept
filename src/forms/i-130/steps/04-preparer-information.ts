import type { StepSchema } from '../../../engine/schema/types';

export const preparerInformationStep: StepSchema = {
  id: 'preparer-information',
  section: 'Getting Started',
  title: 'Preparer Information',
  visibleWhen: { event: 'showStep' },
  fields: [
    { name: 'preparerFirstName', label: "What is your preparer's given name (first name)?", type: 'text' },
    { name: 'preparerLastName', label: "Preparer's family name (last name)", type: 'text' },
    { name: 'preparerNoBusiness', label: 'My preparer is not part of a business or organization.', type: 'checkbox' },
    { name: 'preparerBusiness', label: "What is your preparer's business or organization name?", type: 'text' },
    { name: 'preparerCountry', label: "Preparer's mailing address — Country", type: 'text' },
    { name: 'preparerAddressLine1', label: 'Address line 1', type: 'text', helpText: 'Street number and name' },
    { name: 'preparerCity', label: 'City or town', type: 'text' },
    { name: 'preparerState', label: 'State', type: 'text' },
    { name: 'preparerZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
    { name: 'preparerDaytimePhone', label: 'Daytime telephone number', type: 'text', helpText: 'Provide a 10-digit phone number.' },
    { name: 'preparerEmail', label: 'Email address', type: 'text', helpText: 'Example: user@domain.com' },
  ],
};
