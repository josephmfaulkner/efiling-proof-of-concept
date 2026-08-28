import type { StepSchema } from '../../../engine/schema/types';

export const yourNameStep: StepSchema = {
  id: 'your-name',
  section: 'About You',
  title: 'Your Legal Name',
  description: 'Form I-485, Part 1, Item 1. Use your current legal name — not a nickname.',
  fields: [
    { name: 'familyName', label: 'Family Name (Last Name)', type: 'text', constraints: { required: true, maxLength: 40 } },
    { name: 'givenName', label: 'Given Name (First Name)', type: 'text', constraints: { required: true, maxLength: 40 } },
    { name: 'middleName', label: 'Middle Name (if applicable)', type: 'text', constraints: { maxLength: 40 } },
    {
      name: 'hasUsedOtherNames',
      label: 'Have you used any other names since birth (nicknames, aliases, a name at birth, etc.)?',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
      helpText: 'This is a wizard convenience question — it is not itself printed on the form. Answering "Yes" adds a step for those names.',
    },
  ],
};
