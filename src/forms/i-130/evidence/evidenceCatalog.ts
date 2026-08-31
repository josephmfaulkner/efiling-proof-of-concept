import type { EvidenceCatalog } from '../../../engine/evidence/types';

/**
 * The real myUSCIS I-130 flow presents each of these as its own file-upload
 * wizard step (see myUSCIS_Pages/I-130/35-42, 39-42). This PoC routes them
 * through the generic evidence-checklist mechanism instead of one step file
 * per upload — the conditional ones are wired to rules/i130.rules.json.
 */
export const i130EvidenceCatalog: EvidenceCatalog = {
  formId: 'i-130',
  items: [
    { key: 'photoOfYou', title: '2" x 2" photo of you', alwaysRequired: true },
    {
      key: 'proofOfCitizenship',
      title: 'Proof of U.S. Citizenship',
      description: 'Required because you indicated you are a U.S. citizen (e.g. birth certificate, U.S. passport, Certificate of Naturalization or Citizenship).',
    },
    {
      key: 'proofOfLprStatus',
      title: 'Proof of Lawful Permanent Resident Status',
      description: 'Required because you indicated you are a lawful permanent resident (copy of both sides of your Permanent Resident Card).',
    },
    {
      key: 'proofOfMarriage',
      title: 'Proof of Marriage',
      description: 'Required because you are petitioning for your spouse — a copy of your marriage certificate.',
    },
    {
      key: 'photoOfSpouse',
      title: '2" x 2" photo of your spouse',
      description: 'Required because you are petitioning for your spouse.',
    },
    {
      key: 'additionalProofOfMarriage',
      title: 'Additional proof of marriage',
      description: 'Evidence that your marriage is bona fide, such as joint financial records, leases, or photos together, for your spouse petition.',
    },
    {
      key: 'formI130A',
      title: 'Form I-130A, Supplemental Information for Spouse Beneficiary',
      description: 'Required because you are petitioning for your spouse — your spouse must complete and sign this form.',
    },
    {
      key: 'evidenceEndOfYourPriorMarriage',
      title: 'Evidence of the end of your prior marriage(s)',
      description: 'Required because you indicated a prior marriage (e.g. divorce decree, annulment decree, or death certificate).',
    },
    {
      key: 'evidenceEndOfSpousesPriorMarriage',
      title: "Evidence of the end of your spouse's prior marriage(s)",
      description: "Required because you indicated your beneficiary had a prior marriage (e.g. divorce decree, annulment decree, or death certificate).",
    },
  ],
};
