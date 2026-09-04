import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when selective-service's registeredSelectiveService === 'N'. */
export const evidenceSelectiveServiceStatusStep: StepSchema = {
  id: 'evidence-selective-service-status',
  section: 'Evidence',
  title: 'Selective Service Status and Statement',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'If you were required to but did not register with the Selective Service System before you turned 26 years of age, you must provide:' },
    { type: 'list', items: ['A status information letter from the Selective Service', 'A statement regarding your reasons for failing to register'] },
    {
      type: 'paragraph',
      text: 'Note: If you are 31 years of age or older (or 29 or older if applying as the spouse of a U.S. citizen) when you file Form N-400, you do not need to provide a status information letter or statement.',
    },
  ],
  fields: [{ name: 'evidenceSelectiveServiceStatusFile', label: 'File requirements', type: 'file' }],
};
