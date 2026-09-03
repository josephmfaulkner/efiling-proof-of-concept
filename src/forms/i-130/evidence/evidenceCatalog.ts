import type { EvidenceCatalog } from '../../../engine/evidence/types';

/**
 * Empty, deliberately: I-130's evidence is entirely real wizard steps in
 * their own "Evidence" sidebar section (see steps/35-*.ts through
 * steps/43-i130a.ts, positioned to match the real myUSCIS sidebar — see
 * myUSCIS_Pages/I-130/37_EvidenceOfTheEndOfYourPriorMarriage), not a
 * separate, sidebar-detached checklist screen. An empty catalog is what
 * tells WizardPage to skip straight to Review instead of the generic
 * Evidence Checklist page on completion (see WizardPage.tsx) — the export
 * still exists because every registered form needs one.
 */
export const i130EvidenceCatalog: EvidenceCatalog = {
  formId: 'i-130',
  items: [],
};
