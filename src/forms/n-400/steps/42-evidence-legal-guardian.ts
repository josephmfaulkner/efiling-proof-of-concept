import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when requests-for-accommodations' hasDisability === 'Y'. */
export const evidenceLegalGuardianStep: StepSchema = {
  id: 'evidence-legal-guardian',
  section: 'Evidence',
  title: 'Legal Guardian, Surrogate, or Designated Representative',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: "Provide a court order authorizing the legal guardian or surrogate to exercise authority over the applicant's affairs." },
    {
      type: 'paragraph',
      text: 'In the absence of a court-ordered legal guardian or surrogate, an authorized designated representative who is the primary custodial caregiver and takes responsibility for the applicant can serve as the designated representative, with documentation establishing the familial relationship and caregiving role.',
    },
  ],
  fields: [{ name: 'evidenceLegalGuardianFile', label: 'File requirements', type: 'file' }],
};
