import type { StepSchema } from '../../../engine/schema/types';

export const preparerInterpreterGateStep: StepSchema = {
  id: 'preparer-interpreter-gate',
  section: 'Getting Started',
  title: 'Preparer and Interpreter Information',
  content: [
    { type: 'heading', level: 4, text: 'Before you begin' },
    { type: 'paragraph', text: 'A petitioner is the U.S. citizen or lawful permanent resident who files an alien petition on behalf of a family member.' },
    { type: 'paragraph', text: 'A beneficiary is the family member you are petitioning for.' },
    { type: 'paragraph', text: 'Currently, only the Petition for Alien Relative (I-130) is available online. Form I-485 and Form I-129F cannot be filed online at this time.' },
  ],
  fields: [
    {
      name: 'hasHelper',
      label: 'Is someone assisting you with completing this petition?',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'helperHasPreparer',
      label: 'Is a preparer assisting you with completing this petition?',
      type: 'radio',
      visibleWhen: { event: 'showField' },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'helperHasInterpreter',
      label: 'Is an interpreter assisting you with completing this petition?',
      type: 'radio',
      visibleWhen: { event: 'showField' },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
};
