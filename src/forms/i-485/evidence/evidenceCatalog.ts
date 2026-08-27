import type { EvidenceCatalog } from '../../../engine/evidence/types';

/**
 * Illustrative only — a real filing checklist depends on many more factors
 * than this PoC models. Baseline items are drawn from the I-485 instructions'
 * general "Evidence" section; conditional items are wired to the rules in
 * rules/i485.rules.json purely to demonstrate the mechanism.
 */
export const i485EvidenceCatalog: EvidenceCatalog = {
  formId: 'i-485',
  items: [
    { key: 'governmentId', title: 'Copy of a government-issued photo ID', alwaysRequired: true },
    { key: 'birthCertificate', title: 'Copy of your birth certificate (with certified translation if not in English)', alwaysRequired: true },
    { key: 'twoPhotos', title: 'Two passport-style photos', alwaysRequired: true },
    { key: 'formI693', title: 'Form I-693, Report of Medical Examination and Vaccination Record', alwaysRequired: true },
    {
      key: 'marriageCertificate',
      title: 'Marriage certificate',
      description: 'Required because you selected "Spouse of a U.S. Citizen" as your eligibility category.',
    },
    {
      key: 'formI130',
      title: 'Form I-130, Petition for Alien Relative (approved or concurrently filed)',
      description: 'Required for the marriage-based eligibility category.',
    },
    {
      key: 'formI864',
      title: 'Form I-864, Affidavit of Support',
      description: 'Required for the marriage-based eligibility category.',
    },
    {
      key: 'vawaSelfPetitionEvidence',
      title: 'Form I-360 approval notice or receipt notice (VAWA self-petition)',
      description: 'Required because you selected a VAWA self-petitioner eligibility category.',
    },
    {
      key: 'eoirProceedingsDocuments',
      title: 'Copies of documents related to your EOIR removal/exclusion/rescission/deportation proceedings',
      description: 'Required because you indicated you are currently in such proceedings.',
    },
  ],
};
