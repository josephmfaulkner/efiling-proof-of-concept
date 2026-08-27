export interface EvidenceItem {
  /** Matches an entry in a RuleDefinition's `event.params.evidenceItems`. */
  key: string;
  title: string;
  description?: string;
  /** Shown regardless of rule evaluation (e.g. photos, medical exam) — not gated by activeEvidence. */
  alwaysRequired?: boolean;
}

export interface EvidenceCatalog {
  formId: string;
  items: EvidenceItem[];
}
