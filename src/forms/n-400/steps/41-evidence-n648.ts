import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when requests-for-accommodations' hasDisability === 'Y'. */
export const evidenceN648Step: StepSchema = {
  id: 'evidence-n648',
  section: 'Evidence',
  title: 'Form N-648, Medical Certification for Disability Exceptions',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'Upload a copy or image of a completed and signed Form N-648, Medical Certification for Disability Exceptions.' },
    { type: 'paragraph', text: 'Bring your original Form N-648 to your naturalization interview. Submitting Form N-648 does not guarantee we will exempt you from the testing requirements.' },
  ],
  fields: [{ name: 'evidenceN648File', label: 'File requirements', type: 'file' }],
};
