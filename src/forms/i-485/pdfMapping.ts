import type { PdfMappingDocument } from '../../engine/pdf/types';

/**
 * Every field name below was read directly off the real, decrypted I-485
 * AcroForm (Edition 01/20/25) with pdf-lib — not guessed. See README for how
 * the template was produced from the USCIS-distributed original.
 */

// The A-Number reprints via its own real field in the running header of every page.
const A_NUMBER_HEADER_FIELDS = [
  'form1[0].#subform[0].AlienNumber[0]',
  'form1[0].#subform[1].AlienNumber[1]',
  'form1[0].#subform[2].AlienNumber[2]',
  'form1[0].#subform[3].AlienNumber[3]',
  'form1[0].#subform[4].AlienNumber[4]',
  'form1[0].#subform[5].AlienNumber[5]',
  'form1[0].#subform[6].AlienNumber[6]',
  'form1[0].#subform[7].AlienNumber[7]',
  'form1[0].#subform[8].AlienNumber[8]',
  'form1[0].#subform[9].AlienNumber[9]',
  'form1[0].#subform[10].AlienNumber[10]',
  'form1[0].#subform[11].AlienNumber[11]',
  'form1[0].#subform[12].AlienNumber[12]',
  'form1[0].#subform[13].AlienNumber[13]',
  'form1[0].#subform[14].AlienNumber[14]',
  'form1[0].#subform[15].AlienNumber[15]',
  'form1[0].#subform[16].AlienNumber[16]',
  'form1[0].#subform[17].AlienNumber[17]',
  'form1[0].#subform[18].AlienNumber[18]',
  'form1[0].#subform[20].AlienNumber[19]',
  'form1[0].#subform[21].AlienNumber[20]',
  'form1[0].#subform[22].AlienNumber[21]',
  'form1[0].#subform[23].AlienNumber[22]',
  'form1[0].#subform[24].AlienNumber[23]',
];

// Position N here maps to steps/06-application-category.ts's ELIGIBILITY_CATEGORY_OPTIONS[N] —
// both are ordered from the same pdftotext transcription of the real Part 2, Item 3.a list,
// and that order is independently confirmed by the PDF's own export values (/3a0 .. /3a14).
const ELIGIBILITY_CATEGORY_FIELDS = [
  'spouse_us_citizen',
  'unmarried_child_under21_us_citizen',
  'parent_us_citizen',
  'fiancee_k1_k2',
  'widow_widower_us_citizen',
  'ndaa_deceased_service_member',
  'unmarried_son_daughter_21plus_us_citizen',
  'married_son_daughter_us_citizen',
  'sibling_us_citizen',
  'spouse_lpr',
  'unmarried_child_under21_lpr',
  'unmarried_son_daughter_21plus_lpr',
  'vawa_spouse',
  'vawa_child',
  'vawa_parent',
].map((matchValue, i) => ({ matchValue, pdfFieldName: `form1[0].#subform[4].Pt2Line3a_CB[${i}]` }));

export const i485PdfMapping: PdfMappingDocument = {
  formId: 'i-485',
  entries: [
    { answerKey: 'familyName', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].Pt1Line1_FamilyName[0]'] },
    { answerKey: 'givenName', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].Pt1Line1_GivenName[0]'] },
    { answerKey: 'middleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].Pt1Line1_MiddleName[0]'] },

    { answerKey: 'otherFamilyName', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].Pt1Line2_FamilyName[0]'] },
    { answerKey: 'otherGivenName', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].Pt1Line2_GivenName[0]'] },
    { answerKey: 'otherMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].Pt1Line2_MiddleName[0]'] },

    { answerKey: 'dateOfBirth', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[0].Pt1Line3_DOB[0]'] },
    {
      answerKey: 'hasOtherDobUsed',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[0].Pt1Line3_YN[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[0].Pt1Line3_YN[1]' },
      ],
    },
    {
      answerKey: 'sex',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'F', pdfFieldName: 'form1[0].#subform[1].Pt1Line6_CB_Sex[0]' },
        { matchValue: 'M', pdfFieldName: 'form1[0].#subform[1].Pt1Line6_CB_Sex[1]' },
      ],
    },
    { answerKey: 'cityOfBirth', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt1Line7_CityTownOfBirth[0]'] },
    { answerKey: 'countryOfBirth', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt1Line7_CountryOfBirth[0]'] },

    {
      answerKey: 'countryOfCitizenship',
      kind: 'text',
      pdfFieldNames: ['form1[0].#subform[1].Pt1Line8_CountryofCitizenshipNationality[0]'],
    },
    { answerKey: 'aNumber', kind: 'text', transform: 'stripNonDigits', pdfFieldNames: A_NUMBER_HEADER_FIELDS },
    {
      answerKey: 'uscisOnlineAccountNumber',
      kind: 'text',
      pdfFieldNames: ['form1[0].#subform[0].USCISOnlineAcctNumber[0]'],
    },
    {
      answerKey: 'hasSsnIssued',
      kind: 'checkboxGroup',
      // Verified by hand: this field's on-values are reversed relative to every other Y/N
      // pair on this form ([0]=N, [1]=Y) — a reminder that per-field lookup, not a fixed
      // index convention, is required for every checkboxGroup entry.
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[3].Pt1Line19_YN[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[3].Pt1Line19_YN[0]' },
      ],
    },
    { answerKey: 'ssn', kind: 'text', transform: 'stripNonDigits', pdfFieldNames: ['form1[0].#subform[3].Pt1Line19_SSN[0]'] },

    { answerKey: 'passportNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt1Line10_PassportNum[0]'] },
    {
      answerKey: 'passportExpirationDate',
      kind: 'text',
      transform: 'isoDateToUsDate',
      pdfFieldNames: ['form1[0].#subform[1].Pt1Line10_ExpDate[0]'],
    },
    { answerKey: 'passportIssuingCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt1Line10_Passport[0]'] },
    { answerKey: 'visaNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt1Line10_VisaNum[0]'] },
    {
      answerKey: 'visaIssuedDate',
      kind: 'text',
      transform: 'isoDateToUsDate',
      pdfFieldNames: ['form1[0].#subform[1].Pt1Line10_NonImmDate[0]'],
    },
    { answerKey: 'lastArrivalCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt1Line10_CityTown[0]'] },
    { answerKey: 'lastArrivalState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[1].Pt1Line10_State[0]'] },
    {
      answerKey: 'lastArrivalDate',
      kind: 'text',
      transform: 'isoDateToUsDate',
      pdfFieldNames: ['form1[0].#subform[1].Pt1Line10_DateofArrival[0]'],
    },

    {
      answerKey: 'inRemovalProceedings',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[4].Pt2Line1_YN[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[4].Pt2Line1_YN[1]' },
      ],
    },
    { answerKey: 'eligibilityCategory', kind: 'checkboxGroup', options: ELIGIBILITY_CATEGORY_FIELDS },
  ],
};
