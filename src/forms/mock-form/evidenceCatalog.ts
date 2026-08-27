import type { EvidenceCatalog } from '../../engine/evidence/types';

export const mockFormEvidenceCatalog: EvidenceCatalog = {
  formId: 'mock-form',
  items: [
    { key: 'photoMock', title: 'Passport-style photo', alwaysRequired: true },
    { key: 'marriageCertificateMock', title: 'Marriage certificate', description: 'Required because you selected "Spouse".' },
  ],
};
