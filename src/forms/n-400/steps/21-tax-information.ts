import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const taxInformationStep: StepSchema = {
  id: 'tax-information',
  section: 'Moral Character',
  title: 'Tax Information',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    {
      name: 'oweTaxes',
      label: 'Do you currently owe any overdue Federal, state, or local taxes in the United States?',
      type: 'radio',
      helpText: 'If you have failed to pay taxes as required, we may determine that you lack good moral character.',
      options: YES_NO,
    },
    { name: 'oweTaxesExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
    {
      name: 'calledNonResidentOnTaxReturn',
      label: 'Since you became a lawful permanent resident, have you called yourself a "non-U.S. resident" on a Federal, state, or local tax return or decided not to file a tax return because you considered yourself to be a non-U.S. resident?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'calledNonResidentExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
  ],
};
