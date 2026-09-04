import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const hereditaryOrInheritedTitlesStep: StepSchema = {
  id: 'hereditary-or-inherited-titles',
  section: 'Moral Character',
  title: 'Hereditary or Inherited Titles',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    {
      name: 'hasHereditaryTitle',
      label: 'Do you now have, or did you EVER have, a hereditary title or an order of nobility in any foreign country?',
      type: 'radio',
      helpText: 'If you do have a hereditary title or order of nobility, the law requires you to renounce this title as part of your naturalization ceremony.',
      options: YES_NO,
    },
    { name: 'hereditaryTitleExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
    {
      name: 'willingToGiveUpTitle',
      label: 'Are you willing to give up any inherited titles or orders of nobility that you have in a foreign country at your naturalization ceremony?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'nobilityTitleDetails', label: 'List all your inherited titles and orders of nobility.', type: 'text' },
  ],
};
