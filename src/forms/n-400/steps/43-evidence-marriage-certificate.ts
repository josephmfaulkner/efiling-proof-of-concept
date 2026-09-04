import type { StepSchema } from '../../../engine/schema/types';

/** Visible when marital-status's maritalStatus is not 'single'. */
export const evidenceMarriageCertificateStep: StepSchema = {
  id: 'evidence-marriage-certificate',
  section: 'Evidence',
  title: 'Current Marriage Certificate and Previous Marriage Documents',
  visibleWhen: { event: 'showStep' },
  content: [
    {
      type: 'paragraph',
      text: "Upload a copy of your current marriage certificate. Also upload any divorce decrees, annulment decrees, or death certificates showing that your prior marriages, and your spouse's prior marriages, were terminated (if applicable).",
    },
  ],
  fields: [{ name: 'evidenceMarriageCertificateFile', label: 'File requirements', type: 'file' }],
};
