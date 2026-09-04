import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when preparer-interpreter-gate's helperHasPreparer === 'Y'. */
export const preparerInformationStep: StepSchema = {
  id: 'preparer-information',
  section: 'Getting Started',
  title: 'Preparer Information',
  visibleWhen: { event: 'showStep' },
  fields: [
    { name: 'preparerFirstName', label: "Preparer's given name (first name)", type: 'text' },
    { name: 'preparerLastName', label: "Preparer's family name (last name)", type: 'text' },
    { name: 'preparerNoBusiness', label: 'My preparer is not part of a business or organization.', type: 'checkbox' },
    { name: 'preparerBusiness', label: "What is your preparer's business or organization name?", type: 'text' },
    { name: 'preparerDaytimePhone', label: 'Daytime telephone number', type: 'text', helpText: 'Provide a 10-digit phone number.' },
    { name: 'preparerNoMobile', label: 'My preparer does not have a mobile telephone number.', type: 'checkbox' },
    { name: 'preparerMobilePhone', label: 'Mobile telephone number', type: 'text', helpText: 'Provide a 10-digit phone number.' },
    { name: 'preparerNoEmail', label: 'My preparer does not have an email address.', type: 'checkbox' },
    { name: 'preparerEmail', label: 'Email address', type: 'text', helpText: 'Example: user@domain.com' },
  ],
};
