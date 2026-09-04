import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];
const PARTICIPATE_PREFIX = 'Have you EVER ordered, incited, called for, committed, assisted, helped with, or otherwise participated in';

export const goodMoralCharacterOneStep: StepSchema = {
  id: 'good-moral-character-1',
  section: 'Moral Character',
  title: 'Good Moral Character — Page 1',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    { name: 'participatedInTorture', label: `${PARTICIPATE_PREFIX} torture?`, type: 'radio', options: YES_NO },
    { name: 'participatedInGenocide', label: `${PARTICIPATE_PREFIX} genocide?`, type: 'radio', options: YES_NO },
    { name: 'participatedInKilling', label: `${PARTICIPATE_PREFIX} killing or trying to kill any person?`, type: 'radio', options: YES_NO },
    { name: 'participatedInInjuring', label: `${PARTICIPATE_PREFIX} intentionally and severely injuring or trying to injure any person?`, type: 'radio', options: YES_NO },
  ],
};
