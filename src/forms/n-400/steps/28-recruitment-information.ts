import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const recruitmentInformationStep: StepSchema = {
  id: 'recruitment-information',
  section: 'Moral Character',
  title: 'Recruitment Information',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    {
      name: 'recruitedChildSoldier',
      label: 'Have you EVER recruited (asked), enlisted (signed up), conscripted (required to join), or used any person under 15 years of age to serve in or help an armed group, or attempted or worked with others to do so?',
      type: 'radio',
      options: YES_NO,
    },
    {
      name: 'usedChildInHostilities',
      label: 'Have you EVER used any person under 15 years of age to take part in hostilities or attempted or worked with others to do so? This could include participating in combat or providing services related to combat.',
      type: 'radio',
      options: YES_NO,
    },
  ],
};
