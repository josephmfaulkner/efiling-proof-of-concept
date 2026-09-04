import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when your-name's wantsNameChange === 'Y'. */
export const evidenceNameChangeStep: StepSchema = {
  id: 'evidence-name-change',
  section: 'Evidence',
  title: 'Evidence of Your Name Change',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'If you have legally changed your name, upload a readable image of the legal document that formally changed your name. For example:' },
    { type: 'list', items: ['Marriage certificate', 'Divorce decree', 'Court document'] },
  ],
  fields: [{ name: 'evidenceNameChangeFile', label: 'File requirements', type: 'file' }],
};
