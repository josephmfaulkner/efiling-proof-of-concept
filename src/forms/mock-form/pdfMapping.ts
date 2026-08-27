import type { PdfMappingDocument } from '../../engine/pdf/types';

export const mockFormPdfMapping: PdfMappingDocument = {
  formId: 'mock-form',
  entries: [
    { answerKey: 'petitionerFamilyName', kind: 'text', pdfFieldNames: ['PetitionerFamilyName'] },
    { answerKey: 'petitionerGivenName', kind: 'text', pdfFieldNames: ['PetitionerGivenName'] },
    { answerKey: 'relationshipType', kind: 'dropdown', pdfFieldNames: ['RelationshipType'] },
    { answerKey: 'beneficiaryFamilyName', kind: 'text', pdfFieldNames: ['BeneficiaryFamilyName'] },
    { answerKey: 'beneficiaryGivenName', kind: 'text', pdfFieldNames: ['BeneficiaryGivenName'] },
  ],
};
