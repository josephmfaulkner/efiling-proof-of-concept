import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];
const PARTICIPATE_PREFIX = 'Have you EVER ordered, incited, called for, committed, assisted, helped with, or otherwise participated in';

export const goodMoralCharacterTwoStep: StepSchema = {
  id: 'good-moral-character-2',
  section: 'Moral Character',
  title: 'Good Moral Character — Page 2',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    {
      name: 'participatedInNonconsensualSexualContact',
      label: `${PARTICIPATE_PREFIX} any kind of sexual contact or activity with any person who did not consent or was unable to consent, or was being forced or threatened by you or by someone else?`,
      type: 'radio',
      options: YES_NO,
    },
    {
      name: 'preventedReligiousPractice',
      label: `${PARTICIPATE_PREFIX} not letting someone practice his or her religion?`,
      type: 'radio',
      options: YES_NO,
    },
    {
      name: 'persecuted',
      label: `${PARTICIPATE_PREFIX} causing harm or suffering to any person because of his or her race, religion, national origin, membership in a particular social group, or political opinion?`,
      type: 'radio',
      options: YES_NO,
    },
    { name: 'persecutedExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
  ],
};
