import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const illegalActivityOneStep: StepSchema = {
  id: 'illegal-activity-1',
  section: 'Moral Character',
  title: 'Illegal Activity — Page 1',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    {
      name: 'engagePrositution',
      label: 'Have you EVER engaged in prostitution, attempted to procure or import prostitutes or persons for the purpose of prostitution, or received any proceeds or money from prostitution?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'engagePrositutionExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
    {
      name: 'traffickedControlledSubstances',
      label:
        'Have you EVER manufactured, cultivated, produced, distributed, dispensed, sold, or smuggled (trafficked) any controlled substances, illegal drugs, narcotics, or drug paraphernalia in violation of any law or regulation of a U.S. state, the United States, or a foreign country?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'marriedMultiplePeopleAtOnce', label: 'Have you EVER been married to more than one person at the same time?', type: 'radio', options: YES_NO },
    { name: 'marriedForImmigrationBenefit', label: 'Have you EVER married someone in order to obtain an immigration benefit?', type: 'radio', options: YES_NO },
    { name: 'helpedIllegallyEnter', label: 'Have you EVER helped anyone to enter, or try to enter, the United States illegally?', type: 'radio', options: YES_NO },
    { name: 'helpedIllegallyEnterExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
  ],
};
