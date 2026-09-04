import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when preparer-interpreter-gate's helperHasInterpreter === 'Y'. */
export const interpreterInformationStep: StepSchema = {
  id: 'interpreter-information',
  section: 'Getting Started',
  title: 'Interpreter Information',
  visibleWhen: { event: 'showStep' },
  fields: [
    { name: 'interpreterFirstName', label: "Interpreter's given name (first name)", type: 'text' },
    { name: 'interpreterLastName', label: "Interpreter's family name (last name)", type: 'text' },
    { name: 'interpreterNoBusiness', label: 'My interpreter is not part of a business or organization.', type: 'checkbox' },
    { name: 'interpreterBusiness', label: "What is your interpreter's business or organization name?", type: 'text' },
    { name: 'interpreterDaytimePhone', label: 'Daytime telephone number', type: 'text', helpText: 'Provide a 10-digit phone number.' },
    { name: 'interpreterNoMobile', label: 'My interpreter does not have a mobile telephone number.', type: 'checkbox' },
    { name: 'interpreterMobilePhone', label: 'Mobile telephone number', type: 'text', helpText: 'Provide a 10-digit phone number.' },
    { name: 'interpreterNoEmail', label: 'My interpreter does not have an email address.', type: 'checkbox' },
    { name: 'interpreterEmail', label: 'Email address', type: 'text', helpText: 'Example: user@domain.com' },
    { name: 'interpreterLanguage', label: 'What language is your interpreter using to interpret this application for you?', type: 'text' },
  ],
};
