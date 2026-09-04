import type { StepSchema } from '../../../engine/schema/types';

export const yourNameStep: StepSchema = {
  id: 'your-name',
  section: 'About You',
  title: 'Your Name',
  description: 'Your current legal name is the name on your birth certificate unless it changed after birth by marriage, divorce, or court order. Do not provide any nicknames here.',
  fields: [
    { name: 'yourFirstName', label: 'Given name (first name)', type: 'text' },
    { name: 'yourMiddleName', label: 'Middle name', type: 'text' },
    { name: 'yourLastName', label: 'Family name (last name)', type: 'text', constraints: { required: true } },
    {
      name: 'hasUsedOtherNames',
      label: 'Have you used any other names since birth?',
      type: 'radio',
      helpText: 'Other names used may include nicknames, aliases, and maiden names.',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    { name: 'otherNameFirstName', label: 'Given name (first name)', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'otherNameMiddleName', label: 'Middle name', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'otherNameLastName', label: 'Family name (last name)', type: 'text', visibleWhen: { event: 'showField' } },
    {
      name: 'wantsNameChange',
      label: 'Would you like to legally change your name?',
      type: 'radio',
      helpText: 'A court can allow you to change your name when you naturalize. Any name change you request will not be final until you are naturalized.',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    { name: 'newNameFirstName', label: 'Given name (first name)', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'newNameMiddleName', label: 'Middle name', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'newNameLastName', label: 'Family name (last name)', type: 'text', visibleWhen: { event: 'showField' } },
  ],
};
