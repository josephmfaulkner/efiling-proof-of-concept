import type { StepSchema } from '../../../engine/schema/types';

export const preparerInterpreterGateStep: StepSchema = {
  id: 'preparer-interpreter-gate',
  section: 'Getting Started',
  title: 'Preparer and Interpreter Information',
  fields: [
    {
      name: 'hasHelper',
      label: 'Is someone assisting you with completing this application?',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'helperHasPreparer',
      label: 'Is a preparer assisting you with completing this application?',
      type: 'radio',
      helpText: 'A preparer is anyone who completes or helps you complete all or part of your application using information and answers that you provide.',
      visibleWhen: { event: 'showField' },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'helperHasInterpreter',
      label: 'Is an interpreter assisting you with completing this application?',
      type: 'radio',
      helpText: 'An interpreter is anyone who translates or helps you translate all or part of your application using information and answers that you provide.',
      visibleWhen: { event: 'showField' },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
};
