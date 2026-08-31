import type { StepSchema } from '../../../engine/schema/types';

export const yourNameStep: StepSchema = {
  id: 'your-name',
  section: 'About You',
  title: 'Your Name',
  fields: [
    { name: 'yourFirstName', label: 'Given name (first name)', type: 'text' },
    { name: 'yourMiddleName', label: 'Middle name', type: 'text' },
    { name: 'yourLastName', label: 'Family name (last name)', type: 'text', constraints: { required: true } },
    {
      name: 'hasUsedOtherNames',
      label: 'Have you used any other names since birth?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    { name: 'otherNameFirstName', label: 'Given name (first name)', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'otherNameMiddleName', label: 'Middle name', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'otherNameLastName', label: 'Family name (last name)', type: 'text', visibleWhen: { event: 'showField' } },
  ],
};
