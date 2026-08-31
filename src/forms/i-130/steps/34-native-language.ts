import type { StepSchema } from '../../../engine/schema/types';

export const nativeLanguageStep: StepSchema = {
  id: 'native-language',
  section: 'Other Information',
  title: 'Native Language',
  content: [{ type: 'heading', level: 2, text: 'Information about beneficiary in their native written language' }],
  fields: [{ name: 'nativeLanguageFile', label: 'File requirements', type: 'file', helpText: 'Choose or drop files here to upload.' }],
};
