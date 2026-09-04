import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];
const REMOVAL_HELP = 'If you were placed in removal, rescission, or deportation proceedings or were removed or deported from the United States, you must provide: Name, Port of Entry (POE) of removal, and reason for removal.';

export const immigrationProceedingsStep: StepSchema = {
  id: 'immigration-proceedings',
  section: 'Moral Character',
  title: 'Immigration Proceedings',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    { name: 'placedInRemoval', label: 'Have you EVER been placed in removal, rescission, or deportation proceedings?', type: 'radio', helpText: REMOVAL_HELP, options: YES_NO },
    { name: 'placedInRemovalExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
    { name: 'everDeported', label: 'Have you EVER been removed or deported from the United States?', type: 'radio', helpText: REMOVAL_HELP, options: YES_NO },
    { name: 'everDeportedExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
  ],
};
