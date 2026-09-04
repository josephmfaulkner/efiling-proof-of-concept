import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const partyOrGroupAffiliationsOneStep: StepSchema = {
  id: 'party-or-group-affiliations-1',
  section: 'Moral Character',
  title: 'Party or Group Affiliations — Page 1',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    {
      name: 'communistGroup',
      label: 'Have you EVER been a member of, involved in, or in any way associated with any Communist or totalitarian party anywhere in the world?',
      type: 'radio',
      helpText: 'Current or previous membership in certain organizations may indicate lack of good moral character or lack of attachment to the principles of the U.S. Constitution.',
      options: YES_NO,
    },
    { name: 'communistGroupExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
    {
      name: 'advocatedOverthrow',
      label:
        'Have you EVER advocated (supported and promoted) any of the following, or been a member of, involved in, or in any way associated with any group anywhere in the world that advocated: opposition to all organized government; world communism; a totalitarian dictatorship in the United States; the overthrow of the U.S. Government by force; unlawfully assaulting or killing a government officer; unlawful damage or destruction of property; or sabotage?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'advocatedOverthrowExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
  ],
};
