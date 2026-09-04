import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const citizenshipClaimsAndVotingStep: StepSchema = {
  id: 'citizenship-claims-and-voting',
  section: 'Moral Character',
  title: 'Citizenship Claims and Voting',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    {
      name: 'claimedUsCitizenship',
      label: 'Have you EVER claimed to be a U.S. citizen (in writing or any other way)?',
      type: 'radio',
      helpText: 'You may not qualify for naturalization if you previously claimed you were a U.S. citizen.',
      options: YES_NO,
    },
    {
      name: 'registeredToVote',
      label: 'Have you EVER registered to vote or voted in any Federal, state, or local election in the United States?',
      type: 'radio',
      helpText: 'Voting in a local election will not render an applicant ineligible for naturalization if the applicant was eligible to vote under the relevant law.',
      options: YES_NO,
    },
    { name: 'registeredToVoteExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
  ],
};
