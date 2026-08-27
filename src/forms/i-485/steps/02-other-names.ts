import type { StepSchema } from '../../../engine/schema/types';

export const otherNamesStep: StepSchema = {
  id: 'other-names',
  title: 'Other Names Used',
  description: 'Form I-485, Part 1, Item 2. Provide all other names you have ever used.',
  visibleWhen: { event: 'showStep' },
  fields: [
    { name: 'otherFamilyName', label: 'Family Name (Last Name)', type: 'text', constraints: { maxLength: 40 } },
    { name: 'otherGivenName', label: 'Given Name (First Name)', type: 'text', constraints: { maxLength: 40 } },
    { name: 'otherMiddleName', label: 'Middle Name (if applicable)', type: 'text', constraints: { maxLength: 40 } },
  ],
};
