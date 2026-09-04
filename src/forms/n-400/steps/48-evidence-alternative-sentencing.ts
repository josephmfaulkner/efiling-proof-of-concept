import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when crimes-and-offenses-1's everArrested === 'Y'. */
export const evidenceAlternativeSentencingStep: StepSchema = {
  id: 'evidence-alternative-sentencing',
  section: 'Evidence',
  title: 'Alternative Sentencing or Rehabilitative Programs',
  visibleWhen: { event: 'showStep' },
  content: [
    {
      type: 'paragraph',
      text: 'If you have ever been convicted or placed in an alternative sentencing program (such as diversion, deferred prosecution, withheld adjudication) or rehabilitative program (including drug treatment or community service), you must provide:',
    },
    { type: 'list', items: ['The sentencing record for each incident', 'Evidence that you completed your alternative sentencing or rehabilitative programs'] },
  ],
  fields: [{ name: 'evidenceAlternativeSentencingFile', label: 'File requirements', type: 'file' }],
};
