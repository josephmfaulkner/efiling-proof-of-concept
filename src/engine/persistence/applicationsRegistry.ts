export type ApplicationStatus =
  | 'started'
  | 'in_progress'
  | 'evidence_review'
  | 'ready_to_download'
  | 'downloaded';

export interface ApplicationRecord {
  id: string;
  formId: string;
  formTitle: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
  currentStepId?: string;
}

const KEY = 'uscis-poc:applications';

function readAll(): ApplicationRecord[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ApplicationRecord[];
  } catch {
    return [];
  }
}

function writeAll(records: ApplicationRecord[]) {
  localStorage.setItem(KEY, JSON.stringify(records));
}

export function listApplications(): ApplicationRecord[] {
  return readAll().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getApplication(id: string): ApplicationRecord | undefined {
  return readAll().find((a) => a.id === id);
}

export function createApplication(formId: string, formTitle: string): ApplicationRecord {
  const now = new Date().toISOString();
  const record: ApplicationRecord = {
    id: crypto.randomUUID(),
    formId,
    formTitle,
    status: 'started',
    createdAt: now,
    updatedAt: now,
  };
  writeAll([...readAll(), record]);
  return record;
}

export function updateApplication(id: string, patch: Partial<Omit<ApplicationRecord, 'id'>>) {
  const records = readAll();
  const idx = records.findIndex((a) => a.id === id);
  if (idx === -1) return;
  records[idx] = { ...records[idx], ...patch, updatedAt: new Date().toISOString() };
  writeAll(records);
}

export function deleteApplication(id: string) {
  writeAll(readAll().filter((a) => a.id !== id));
}
