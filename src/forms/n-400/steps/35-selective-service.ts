import type { StepSchema } from '../../../engine/schema/types';

export const selectiveServiceStep: StepSchema = {
  id: 'selective-service',
  section: 'Moral Character',
  title: 'Selective Service',
  fields: [
    {
      name: 'wasMaleAge18To26InUs',
      label: 'Are you a male who lived in the United States at any time between your 18th and 26th birthdays?',
      type: 'radio',
      helpText: 'Almost all persons born as male who are either U.S. citizens or immigrants and are between 18 and 26 years of age must register with the Selective Service System.',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'registeredSelectiveService',
      label: 'Did you register for the Selective Service?',
      type: 'radio',
      visibleWhen: { event: 'showField' },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
};
