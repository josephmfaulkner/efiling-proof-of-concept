import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const illegalActivityTwoStep: StepSchema = {
  id: 'illegal-activity-2',
  section: 'Moral Character',
  title: 'Illegal Activity — Page 2',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    { name: 'illegalGambling', label: 'Have you EVER gambled illegally or received income from illegal gambling?', type: 'radio', options: YES_NO },
    {
      name: 'failedToSupportDependents',
      label: 'Have you EVER failed to support your dependents (pay child support) or to pay alimony (court-ordered financial support after divorce or separation)?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'misrepresentedForPublicBenefit', label: 'Have you EVER made any misrepresentation to obtain any public benefit in the United States?', type: 'radio', options: YES_NO },
    { name: 'gaveFalseInfoToGovernment', label: 'Have you EVER given any U.S. Government officials any information or documentation that was false, fraudulent, or misleading?', type: 'radio', options: YES_NO },
    {
      name: 'liedForEntryOrBenefits',
      label: 'Have you EVER lied to any U.S. Government officials to gain entry or admission into the United States or to gain immigration benefits while in the United States?',
      type: 'radio',
      options: YES_NO,
    },
  ],
};
