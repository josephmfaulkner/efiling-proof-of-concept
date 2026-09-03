import type { StepSchema } from '../../../engine/schema/types';

/**
 * Visible only when additional-information-about-you's immigrationStatus === 'citizen'.
 * Not itself a separately-captured real page (the captured walkthrough took the LPR
 * branch — see 36-proof-of-lawful-permanent-resident-status.ts) but its sidebar entry is
 * confirmed real (see myUSCIS_Pages/I-130/11_AdditionalInformation's full sidebar list) —
 * content here is written to the same standard as its LPR sibling, not copied verbatim.
 */
export const proofOfCitizenshipStep: StepSchema = {
  id: 'proof-of-citizenship',
  section: 'Evidence',
  title: 'Proof of U.S. Citizenship',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'Upload a copy of one of the following: your birth certificate showing birth in the United States, an unexpired U.S. passport, a Certificate of Naturalization, a Certificate of Citizenship, or Form FS-240, Consular Report of Birth Abroad.' },
    { type: 'paragraph', text: 'Make sure all text is clear and readable.' },
  ],
  fields: [{ name: 'proofOfCitizenshipFile', label: 'File requirements', type: 'file' }],
};
