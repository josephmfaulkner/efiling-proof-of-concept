import type { StepSchema } from '../../../engine/schema/types';

export const evidenceAdditionalStep: StepSchema = {
  id: 'evidence-additional',
  section: 'Evidence',
  title: 'Additional Evidence You Want to Provide',
  content: [
    {
      type: 'paragraph',
      text: 'You can provide additional documents that support your application and help explain any of your responses. If you want to provide additional evidence, upload those documents here. You can also bring the documents to your naturalization interview.',
    },
  ],
  fields: [{ name: 'evidenceAdditionalFile', label: 'File requirements', type: 'file' }],
};
