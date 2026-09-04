import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when crimes-and-offenses-1's everArrested === 'Y'. */
export const evidenceConvictionsSentencesStep: StepSchema = {
  id: 'evidence-convictions-sentences',
  section: 'Evidence',
  title: 'Convictions and Sentences',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'If you have ever been convicted and sentenced (including if your sentence was suspended, or you were placed on probation or parole), you must provide:' },
    { type: 'list', items: ['The sentencing record for each incident', 'Evidence that you completed your sentence, such as probation or parole records'] },
  ],
  fields: [{ name: 'evidenceConvictionsSentencesFile', label: 'File requirements', type: 'file' }],
};
