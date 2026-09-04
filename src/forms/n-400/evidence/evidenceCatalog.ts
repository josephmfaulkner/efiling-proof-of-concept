import type { EvidenceCatalog } from '../../../engine/evidence/types';

/**
 * Empty, deliberately: N-400's evidence is entirely real wizard steps in
 * their own "Evidence" sidebar section (see steps/40-*.ts through
 * steps/54-*.ts), not a separate, sidebar-detached checklist screen — same
 * pattern as I-130. An empty catalog is what tells WizardPage to skip
 * straight to Review instead of the generic Evidence Checklist page on
 * completion (see WizardPage.tsx) — the export still exists because every
 * registered form needs one.
 */
export const n400EvidenceCatalog: EvidenceCatalog = {
  formId: 'n-400',
  items: [],
};
