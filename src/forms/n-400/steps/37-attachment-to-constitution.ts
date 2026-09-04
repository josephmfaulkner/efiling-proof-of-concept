import type { StepSchema } from '../../../engine/schema/types';

export const attachmentToConstitutionStep: StepSchema = {
  id: 'attachment-to-constitution',
  section: 'Attachment to the U.S. Constitution',
  title: 'Attachment to the U.S. Constitution',
  fields: [
    {
      name: 'supportsConstitution',
      label: 'Do you support the Constitution and form of Government of the United States?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
};
