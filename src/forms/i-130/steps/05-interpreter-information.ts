import type { StepSchema } from '../../../engine/schema/types';

export const interpreterInformationStep: StepSchema = {
  id: 'interpreter-information',
  section: 'Getting Started',
  title: 'Interpreter Information',
  visibleWhen: { event: 'showStep' },
  fields: [
    { name: 'interpreterFirstName', label: "What is your interpreter's given name (first name)?", type: 'text' },
    { name: 'interpreterLastName', label: "Interpreter's family name (last name)", type: 'text' },
    { name: 'interpreterLanguage', label: 'What language is your interpreter using to assist you?', type: 'text' },
    { name: 'interpreterNoBusiness', label: 'My interpreter is not part of a business or organization.', type: 'checkbox' },
    { name: 'interpreterBusiness', label: "What is your interpreter's business or organization name?", type: 'text' },
    { name: 'interpreterCountry', label: "Interpreter's mailing address — Country", type: 'text' },
    { name: 'interpreterAddressLine1', label: 'Address line 1', type: 'text', helpText: 'Street number and name' },
    { name: 'interpreterCity', label: 'City or town', type: 'text' },
    { name: 'interpreterState', label: 'State', type: 'text' },
    { name: 'interpreterZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
    { name: 'interpreterDaytimePhone', label: 'Daytime telephone number', type: 'text', helpText: 'Provide a 10-digit phone number.' },
    { name: 'interpreterEmail', label: 'Email address', type: 'text', helpText: 'Example: user@domain.com' },
  ],
};
