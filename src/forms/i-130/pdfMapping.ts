import type { PdfMappingDocument } from '../../engine/pdf/types';

/**
 * Every field name below was read directly off the real, decrypted I-130
 * AcroForm (Edition 04/01/24) with pdf-lib — not guessed. See README for how
 * the template was produced from the USCIS-distributed original.
 *
 * The real form's internal field names use a "PtNLineM_..." convention, but
 * several of those internal Line numbers do not match the *printed* item
 * numbers next to them (a common legacy artifact in USCIS's Adobe LiveCycle
 * forms after revisions renumber the printed form but not the field names).
 * Every mapping below was resolved by reading the actual printed field
 * labels via `pdftotext`, not by trusting the internal Line number alone.
 *
 * A handful of real fields are deliberately left unmapped, same spirit as
 * the I-485 mapping's "only a subset of fields is ever hand-mapped" note:
 *  - Weight (3 individual boxed digits) and eye/hair color (fixed
 *    single-select checkbox grids fed by our free-text fields) — no clean
 *    1:1 shape for a free-text answer.
 *  - Beneficiary's current/prior spouse names and "Person 1-5" additional
 *    family members — the real form's internal field names for this block
 *    collide across two different printed item numbers in a way that
 *    couldn't be confidently disambiguated from the static HTML captures.
 *  - Beneficiary's Class of Admission — a real dropdown with ~200 fixed
 *    codes; our field collects free text, so a match is unlikely.
 *  - "Other Names Used" / "Employer 2" second entries, and every file-upload
 *    field — this PoC's steps model one entry per repeating group (see the
 *    step files) and never write files into the PDF itself.
 */

const A_NUMBER_FIELDS = ['form1[0].#subform[0].#area[4].Pt2Line1_AlienNumber[0]', 'form1[0].#subform[11].Pt2Line1_AlienNumber[1]'];
const YOUR_FAMILY_NAME_FIELDS = ['form1[0].#subform[0].Pt2Line4a_FamilyName[0]', 'form1[0].#subform[11].Pt2Line4a_FamilyName[1]'];
const YOUR_GIVEN_NAME_FIELDS = ['form1[0].#subform[0].Pt2Line4b_GivenName[0]', 'form1[0].#subform[11].Pt2Line4b_GivenName[1]'];
const YOUR_MIDDLE_NAME_FIELDS = ['form1[0].#subform[0].Pt2Line4c_MiddleName[0]', 'form1[0].#subform[11].Pt2Line4c_MiddleName[1]'];

export const i130PdfMapping: PdfMappingDocument = {
  formId: 'i-130',
  entries: [
    // ---- Part 1. Relationship ----
    {
      answerKey: 'filingPetitionFor',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'spouse', pdfFieldName: 'form1[0].#subform[0].Pt1Line1_Spouse[0]' },
        { matchValue: 'parent', pdfFieldName: 'form1[0].#subform[0].Pt1Line1_Parent[0]' },
        { matchValue: 'sibling', pdfFieldName: 'form1[0].#subform[0].Pt1Line1_Siblings[0]' },
        { matchValue: 'child', pdfFieldName: 'form1[0].#subform[0].Pt1Line1_Child[0]' },
      ],
    },
    {
      answerKey: 'gainedStatusThroughAdoption',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[0].Pt1Line4_Yes[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[0].Pt1Line4_No[0]' },
      ],
    },

    // ---- Part 2. Information About You (Petitioner) ----
    { answerKey: 'aNumber', kind: 'text', transform: 'stripNonDigits', pdfFieldNames: A_NUMBER_FIELDS },
    { answerKey: 'uscisOnlineAccountNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].#area[5].Pt2Line2_USCISOnlineActNumber[0]'] },
    { answerKey: 'ssn', kind: 'text', transform: 'stripNonDigits', pdfFieldNames: ['form1[0].#subform[0].Pt2Line11_SSN[0]'] },
    { answerKey: 'yourLastName', kind: 'text', pdfFieldNames: YOUR_FAMILY_NAME_FIELDS },
    { answerKey: 'yourFirstName', kind: 'text', pdfFieldNames: YOUR_GIVEN_NAME_FIELDS },
    { answerKey: 'yourMiddleName', kind: 'text', pdfFieldNames: YOUR_MIDDLE_NAME_FIELDS },
    { answerKey: 'otherNameLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line5a_FamilyName[0]'] },
    { answerKey: 'otherNameFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line5b_GivenName[0]'] },
    { answerKey: 'otherNameMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line5c_MiddleName[0]'] },
    { answerKey: 'cityOfBirth', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line6_CityTownOfBirth[0]'] },
    { answerKey: 'countryOfBirth', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line7_CountryofBirth[0]'] },
    { answerKey: 'dateOfBirth', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[1].Pt2Line8_DateofBirth[0]'] },
    {
      answerKey: 'yourGender',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'M', pdfFieldName: 'form1[0].#subform[1].Pt2Line9_Male[0]' },
        { matchValue: 'F', pdfFieldName: 'form1[0].#subform[1].Pt2Line9_Female[0]' },
      ],
    },

    // Mailing address
    { answerKey: 'mailingInCareOf', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line10_InCareofName[0]'] },
    { answerKey: 'mailingCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line10_Country[0]'] },
    { answerKey: 'mailingAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line10_StreetNumberName[0]'] },
    { answerKey: 'mailingAddressLine2', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line10_AptSteFlrNumber[0]'] },
    { answerKey: 'mailingCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line10_CityOrTown[0]'] },
    { answerKey: 'mailingState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[1].Pt2Line10_State[0]'] },
    { answerKey: 'mailingZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line10_ZipCode[0]'] },
    {
      answerKey: 'isMailingEqualToPhysical',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[1].Pt2Line11_Yes[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[1].Pt2Line11_No[0]' },
      ],
    },

    // Physical address / address history (most recent entry)
    { answerKey: 'addressHistoryCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line12_Country[0]'] },
    { answerKey: 'addressHistoryLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line12_StreetNumberName[0]'] },
    { answerKey: 'addressHistoryLine2', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line12_AptSteFlrNumber[0]'] },
    { answerKey: 'addressHistoryCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line12_CityOrTown[0]'] },
    { answerKey: 'addressHistoryState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[1].Pt2Line12_State[0]'] },
    { answerKey: 'addressHistoryZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line12_ZipCode[0]'] },
    { answerKey: 'addressHistoryFromDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[1].Pt2Line13a_DateFrom[0]'] },
    { answerKey: 'addressHistoryToDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[1].Pt2Line13b_DateTo[0]'] },

    // Marital information
    { answerKey: 'timesMarried', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Pt2Line16_NumberofMarriages[0]'] },
    {
      answerKey: 'maritalStatus',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'single', pdfFieldName: 'form1[0].#subform[1].Pt2Line17_Single[0]' },
        { matchValue: 'married', pdfFieldName: 'form1[0].#subform[1].Pt2Line17_Married[0]' },
        { matchValue: 'divorced', pdfFieldName: 'form1[0].#subform[1].Pt2Line17_Divorced[0]' },
        { matchValue: 'widowed', pdfFieldName: 'form1[0].#subform[1].Pt2Line17_Widowed[0]' },
        { matchValue: 'separated', pdfFieldName: 'form1[0].#subform[1].Pt2Line17_Separated[0]' },
        { matchValue: 'annulled', pdfFieldName: 'form1[0].#subform[1].Pt2Line17_Annulled[0]' },
      ],
    },

    // Current spouse (Spouse 1) + place/date of current marriage
    { answerKey: 'currentSpouseLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].PtLine20a_FamilyName[0]'] },
    { answerKey: 'currentSpouseFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line20b_GivenName[0]'] },
    { answerKey: 'currentSpouseMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line20c_MiddleName[0]'] },
    { answerKey: 'currentSpouseMarriageDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[2].Pt2Line18_DateOfMarriage[0]'] },
    { answerKey: 'currentSpouseMarriageCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line19a_CityTown[0]'] },
    { answerKey: 'currentSpouseMarriageState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[2].Pt2Line19b_State[0]'] },
    { answerKey: 'currentSpouseMarriageCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line19d_Country[0]'] },
    { answerKey: 'currentSpouseDateLastMarriageEnded', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[2].Pt2Line21_DateMarriageEnded[0]'] },

    // Prior spouse (Spouse 2)
    { answerKey: 'priorSpouseLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line22a_FamilyName[0]'] },
    { answerKey: 'priorSpouseFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line22b_GivenName[0]'] },
    { answerKey: 'priorSpouseMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line22c_MiddleName[0]'] },
    { answerKey: 'priorMarriageEndDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[2].Pt2Line23_DateMarriageEnded[0]'] },

    // Parent 1
    // Note: unlike Parent 2's name fields below, the real form's Parent 1 name
    // fields have no a/b/c letter suffix internally (a genuine asymmetry, verified).
    { answerKey: 'parentOneLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line24_FamilyName[0]'] },
    { answerKey: 'parentOneFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line24_GivenName[0]'] },
    { answerKey: 'parentOneMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line24_MiddleName[0]'] },
    { answerKey: 'parentOneDateOfBirth', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[2].Pt2Line25_DateofBirth[0]'] },
    {
      answerKey: 'parentOneGender',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'M', pdfFieldName: 'form1[0].#subform[2].Pt2Line26_Male[0]' },
        { matchValue: 'F', pdfFieldName: 'form1[0].#subform[2].Pt2Line26_Female[0]' },
      ],
    },
    { answerKey: 'parentOneCountryOfBirth', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line27_CountryofBirth[0]'] },
    { answerKey: 'parentOneCityOfResidence', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line28_CityTownOrVillageOfResidence[0]'] },
    { answerKey: 'parentOneCountryOfResidence', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line29_CountryOfResidence[0]'] },

    // Parent 2
    { answerKey: 'parentTwoLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line30a_FamilyName[0]'] },
    { answerKey: 'parentTwoFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line30b_GivenName[0]'] },
    { answerKey: 'parentTwoMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line30c_MiddleName[0]'] },
    { answerKey: 'parentTwoDateOfBirth', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[2].Pt2Line31_DateofBirth[0]'] },
    {
      answerKey: 'parentTwoGender',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'M', pdfFieldName: 'form1[0].#subform[2].Pt2Line32_Male[0]' },
        { matchValue: 'F', pdfFieldName: 'form1[0].#subform[2].Pt2Line32_Female[0]' },
      ],
    },
    { answerKey: 'parentTwoCountryOfBirth', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line33_CountryofBirth[0]'] },
    { answerKey: 'parentTwoCityOfResidence', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line34_CityTownOrVillageOfResidence[0]'] },
    { answerKey: 'parentTwoCountryOfResidence', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line35_CountryOfResidence[0]'] },

    // Additional info about you: citizen/LPR branch
    {
      answerKey: 'immigrationStatus',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'citizen', pdfFieldName: 'form1[0].#subform[2].Pt2Line36_USCitizen[0]' },
        { matchValue: 'lpr', pdfFieldName: 'form1[0].#subform[2].Pt2Line36_LPR[0]' },
      ],
    },
    {
      answerKey: 'becameCitizenBy',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'birth', pdfFieldName: 'form1[0].#subform[2].Pt2Line23a_checkbox[0]' },
        { matchValue: 'naturalization', pdfFieldName: 'form1[0].#subform[2].Pt2Line23b_checkbox[0]' },
        { matchValue: 'parents', pdfFieldName: 'form1[0].#subform[2].Pt2Line23c_checkbox[0]' },
      ],
    },
    {
      answerKey: 'hasNaturalizationCertificate',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[2].Pt2Line36_Yes[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[2].Pt2Line36_No[0]' },
      ],
    },
    { answerKey: 'certificateNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line37a_CertificateNumber[0]'] },
    { answerKey: 'certificateIssuancePlace', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].Pt2Line37b_PlaceOfIssuance[0]'] },
    { answerKey: 'certificateIssuanceDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[2].Pt2Line37c_DateOfIssuance[0]'] },

    // Lawful permanent resident info
    { answerKey: 'lprClassOfAdmission', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].Pt2Line40a_ClassOfAdmission[0]'] },
    { answerKey: 'lprDateOfAdmission', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[3].Pt2Line40b_DateOfAdmission[0]'] },
    { answerKey: 'lprAdmissionCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].Pt2Line40d_CityOrTown[0]'] },
    { answerKey: 'lprAdmissionState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[3].Pt2Line40e_State[0]'] },
    {
      answerKey: 'lprThroughMarriage',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[3].Pt2Line41_Yes[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[3].Pt2Line41_No[0]' },
      ],
    },

    // Employment history (Employer 1 — most recent)
    { answerKey: 'employerName', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].Pt2Line40_EmployerOrCompName[0]'] },
    { answerKey: 'employerCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].Pt2Line41_Country[0]'] },
    { answerKey: 'employerAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].Pt2Line41_StreetNumberName[0]'] },
    { answerKey: 'employerAddressLine2', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].Pt2Line41_AptSteFlrNumber[0]'] },
    { answerKey: 'employerCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].Pt2Line41_CityOrTown[0]'] },
    { answerKey: 'employerState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[3].Pt2Line41_State[0]'] },
    { answerKey: 'employerZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].Pt2Line41_ZipCode[0]'] },
    { answerKey: 'employerOccupation', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].Pt2Line42_Occupation[0]'] },
    { answerKey: 'employmentFromDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[3].Pt2Line43a_DateFrom[0]'] },
    { answerKey: 'employmentToDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[3].Pt2Line43b_DateTo[0]'] },

    // Your contact information (Part 6 — Petitioner's Contact Info, Declaration & Signature)
    { answerKey: 'daytimePhoneNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[8].Pt6Line3_DaytimePhoneNumber[0]'] },
    { answerKey: 'mobilePhoneNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[8].Pt6Line4_MobileNumber[0]'] },
    { answerKey: 'emailAddress', kind: 'text', pdfFieldNames: ['form1[0].#subform[8].Pt6Line5_Email[0]'] },

    // ---- Part 3. Biographic Information ----
    {
      answerKey: 'yourEthnicity',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'H', pdfFieldName: 'form1[0].#subform[3].Pt3Line1_Ethnicity[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[3].Pt3Line1_Ethnicity[0]' },
      ],
    },
    { answerKey: 'raceWhite', kind: 'checkbox', pdfFieldNames: ['form1[0].#subform[3].Pt3Line2_Race_White[0]'] },
    { answerKey: 'raceAsian', kind: 'checkbox', pdfFieldNames: ['form1[0].#subform[3].Pt3Line2_Race_Asian[0]'] },
    { answerKey: 'raceBlackAfricanAmerican', kind: 'checkbox', pdfFieldNames: ['form1[0].#subform[3].Pt3Line2_Race_Black[0]'] },
    { answerKey: 'raceAmericanIndianAlaskaNative', kind: 'checkbox', pdfFieldNames: ['form1[0].#subform[3].Pt3Line2_Race_AmericanIndianAlaskaNative[0]'] },
    { answerKey: 'raceNativeHawaiianPacificIslander', kind: 'checkbox', pdfFieldNames: ['form1[0].#subform[3].Pt3Line2_Race_NativeHawaiianOtherPacificIslander[0]'] },
    { answerKey: 'heightFeet', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[3].Pt3Line3_HeightFeet[0]'] },
    { answerKey: 'heightInches', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[3].Pt3Line3_HeightInches[0]'] },

    // ---- Part 4. Information About Beneficiary ----
    { answerKey: 'beneficiaryANumber', kind: 'text', transform: 'stripNonDigits', pdfFieldNames: ['form1[0].#subform[4].#area[6].Pt4Line1_AlienNumber[0]'] },
    { answerKey: 'beneficiaryUscisOnlineAccountNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].#area[7].Pt4Line2_USCISOnlineActNumber[0]'] },
    { answerKey: 'beneficiarySsn', kind: 'text', transform: 'stripNonDigits', pdfFieldNames: ['form1[0].#subform[4].Pt4Line3_SSN[0]'] },
    { answerKey: 'beneficiaryLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line4a_FamilyName[0]'] },
    { answerKey: 'beneficiaryFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line4b_GivenName[0]'] },
    { answerKey: 'beneficiaryMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line4c_MiddleName[0]'] },
    { answerKey: 'beneficiaryOtherLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].P4Line5a_FamilyName[0]'] },
    { answerKey: 'beneficiaryOtherFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line5b_GivenName[0]'] },
    { answerKey: 'beneficiaryOtherMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line5c_MiddleName[0]'] },
    { answerKey: 'beneficiaryCityOfBirth', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line7_CityTownOfBirth[0]'] },
    { answerKey: 'beneficiaryCountryOfBirth', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line8_CountryOfBirth[0]'] },
    { answerKey: 'beneficiaryDateOfBirth', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[4].Pt4Line9_DateOfBirth[0]'] },
    {
      answerKey: 'beneficiaryGender',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'M', pdfFieldName: 'form1[0].#subform[4].Pt4Line9_Male[0]' },
        { matchValue: 'F', pdfFieldName: 'form1[0].#subform[4].Pt4Line9_Female[0]' },
      ],
    },
    {
      answerKey: 'hasPriorPetition',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[4].Pt4Line10_Yes[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[4].Pt4Line10_No[0]' },
        { matchValue: 'unknown', pdfFieldName: 'form1[0].#subform[4].Pt4Line10_Unknown[0]' },
      ],
    },

    // Beneficiary's physical address
    { answerKey: 'beneficiaryPhysicalCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line11_Country[0]'] },
    { answerKey: 'beneficiaryPhysicalAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line11_StreetNumberName[0]'] },
    { answerKey: 'beneficiaryPhysicalAddressLine2', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line11_AptSteFlrNumber[0]'] },
    { answerKey: 'beneficiaryPhysicalCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line11_CityOrTown[0]'] },
    { answerKey: 'beneficiaryPhysicalState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[4].Pt4Line11_State[0]'] },
    { answerKey: 'beneficiaryPhysicalZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line11_ZipCode[0]'] },

    // Beneficiary's intended U.S. address
    { answerKey: 'beneficiaryUsIntendedAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line12a_StreetNumberName[0]'] },
    { answerKey: 'beneficiaryUsIntendedAddressLine2', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line12b_AptSteFlrNumber[0]'] },
    { answerKey: 'beneficiaryUsIntendedCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line12c_CityOrTown[0]'] },
    { answerKey: 'beneficiaryUsIntendedState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[4].Pt4Line12d_State[0]'] },
    { answerKey: 'beneficiaryUsIntendedZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line12e_ZipCode[0]'] },

    // Beneficiary's address outside the U.S.
    { answerKey: 'beneficiaryOutsideUsCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line13_Country[0]'] },
    { answerKey: 'beneficiaryOutsideUsAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line13_StreetNumberName[0]'] },
    { answerKey: 'beneficiaryOutsideUsAddressLine2', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line13_AptSteFlrNumber[0]'] },
    { answerKey: 'beneficiaryOutsideUsCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line13_CityOrTown[0]'] },
    { answerKey: 'beneficiaryOutsideUsProvince', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line13_Province[0]'] },
    { answerKey: 'beneficiaryOutsideUsPostalCode', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line13_PostalCode[0]'] },

    { answerKey: 'beneficiaryDaytimePhoneNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].Pt4Line14_DaytimePhoneNumber[0]'] },
    { answerKey: 'beneficiaryMobilePhoneNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[5].Pt4Line15_MobilePhoneNumber[0]'] },
    { answerKey: 'beneficiaryEmailAddress', kind: 'text', pdfFieldNames: ['form1[0].#subform[5].Pt4Line16_EmailAddress[0]'] },

    // Beneficiary's marital information
    { answerKey: 'beneficiaryTimesMarried', kind: 'text', pdfFieldNames: ['form1[0].#subform[5].Pt4Line17_NumberofMarriages[0]'] },
    {
      answerKey: 'beneficiaryMaritalStatus',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'single', pdfFieldName: 'form1[0].#subform[5].Pt4Line18_MaritalStatus[3]' },
        { matchValue: 'married', pdfFieldName: 'form1[0].#subform[5].Pt4Line18_MaritalStatus[4]' },
        { matchValue: 'divorced', pdfFieldName: 'form1[0].#subform[5].Pt4Line18_MaritalStatus[5]' },
        { matchValue: 'widowed', pdfFieldName: 'form1[0].#subform[5].Pt4Line18_MaritalStatus[0]' },
        { matchValue: 'separated', pdfFieldName: 'form1[0].#subform[5].Pt4Line18_MaritalStatus[2]' },
        { matchValue: 'annulled', pdfFieldName: 'form1[0].#subform[5].Pt4Line18_MaritalStatus[1]' },
      ],
    },

    // Beneficiary's entry information
    {
      answerKey: 'beneficiaryHasBeenInUs',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].Pt4Line20_Yes[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].Pt4Line20_No[0]' },
      ],
    },
    { answerKey: 'beneficiaryI94Number', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].#area[8].Pt4Line21b_ArrivalDeparture[0]'] },
    { answerKey: 'beneficiaryDateOfArrival', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[6].Pt4Line21c_DateOfArrival[0]'] },
    { answerKey: 'beneficiaryStayExpirationDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[6].Pt4Line21d_DateExpired[0]'] },
    { answerKey: 'beneficiaryPassportNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].Pt4Line22_PassportNumber[0]'] },
    { answerKey: 'beneficiaryTravelDocumentNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].Pt4Line23_TravelDocNumber[0]'] },
    { answerKey: 'beneficiaryPassportCountryOfIssuance', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].Pt4Line24_CountryOfIssuance[0]'] },
    { answerKey: 'beneficiaryPassportExpirationDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[6].Pt4Line25_ExpDate[0]'] },

    // Beneficiary's employment
    { answerKey: 'beneficiaryEmployerName', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].Pt4Line26_NameOfCompany[0]'] },
    { answerKey: 'beneficiaryEmployerCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].Pt4Line26_Country[0]'] },
    { answerKey: 'beneficiaryEmployerAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].Pt4Line26_StreetNumberName[0]'] },
    { answerKey: 'beneficiaryEmployerAddressLine2', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].Pt4Line26_AptSteFlrNumber[0]'] },
    { answerKey: 'beneficiaryEmployerCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].Pt4Line26_CityOrTown[0]'] },
    { answerKey: 'beneficiaryEmployerState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[6].Pt4Line26_State[0]'] },
    { answerKey: 'beneficiaryEmployerZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].Pt4Line26_ZipCode[0]'] },
    { answerKey: 'beneficiaryEmploymentFromDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[6].Pt4Line27_DateEmploymentBegan[0]'] },

    // Beneficiary's immigration proceedings
    {
      answerKey: 'beneficiaryHasBeenInImmigrationProceedings',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].Pt4Line28_Yes[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].Pt4Line28_No[0]' },
      ],
    },
    {
      answerKey: 'proceedingType',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'removal', pdfFieldName: 'form1[0].#subform[6].Pt4Line54_Removal[0]' },
        { matchValue: 'rescission', pdfFieldName: 'form1[0].#subform[6].Pt4Line54_Rescission[0]' },
        { matchValue: 'exclusion_deportation', pdfFieldName: 'form1[0].#subform[6].Pt4Line54_Exclusion[0]' },
        { matchValue: 'other_judicial', pdfFieldName: 'form1[0].#subform[6].Pt4Line54_JudicialProceedings[0]' },
      ],
    },
    { answerKey: 'proceedingCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[6].Pt4Line55a_CityOrTown[0]'] },
    { answerKey: 'proceedingState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[6].Pt4Line55b_State[0]'] },
    { answerKey: 'proceedingDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[6].Pt4Line56_Date[0]'] },

    // Address where you and your spouse last lived together
    { answerKey: 'livedTogetherCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line57_Country[0]'] },
    { answerKey: 'livedTogetherAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line57_StreetNumberName[0]'] },
    { answerKey: 'livedTogetherAddressLine2', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line57_AptSteFlrNumber[0]'] },
    { answerKey: 'livedTogetherCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line57_CityOrTown[0]'] },
    { answerKey: 'livedTogetherState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[7].Pt4Line57_State[0]'] },
    { answerKey: 'livedTogetherZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line57_ZipCode[0]'] },
    { answerKey: 'livedTogetherFromDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[7].Pt4Line58a_DateFrom[0]'] },
    { answerKey: 'livedTogetherToDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[7].Pt4Line58b_DateTo[0]'] },

    // Adjustment of status
    { answerKey: 'adjustmentUscisOfficeCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line60a_CityOrTown[0]'] },
    { answerKey: 'adjustmentUscisOfficeState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[7].Pt4Line60b_State[0]'] },
    { answerKey: 'adjustmentEmbassyCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line61a_CityOrTown[0]'] },
    { answerKey: 'adjustmentEmbassyProvince', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line61b_Province[0]'] },
    { answerKey: 'adjustmentEmbassyCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line61c_Country[0]'] },

    // ---- Part 5. Other Information ----
    {
      answerKey: 'previouslyFiledPetition',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[7].Part4Line1_Yes[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[7].Part4Line1_No[0]' },
      ],
    },
    { answerKey: 'priorPetitionBeneficiaryLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt5Line2a_FamilyName[0]'] },
    { answerKey: 'priorPetitionBeneficiaryFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt5Line2b_GivenName[0]'] },
    { answerKey: 'priorPetitionBeneficiaryMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt5Line2c_MiddleName[0]'] },
    { answerKey: 'priorPetitionCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt5Line3a_CityOrTown[0]'] },
    { answerKey: 'priorPetitionState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[7].Pt5Line3b_State[0]'] },
    { answerKey: 'priorPetitionDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[7].Pt5Line4_DateFiled[0]'] },
    { answerKey: 'priorPetitionResult', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt5Line5_Result[0]'] },

    { answerKey: 'otherPetitionRelativeLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line6a_FamilyName[0]'] },
    { answerKey: 'otherPetitionRelativeFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line6b_GivenName[0]'] },
    { answerKey: 'otherPetitionRelativeMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line6c_MiddleName[0]'] },
    { answerKey: 'otherPetitionRelationship', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].Pt4Line7_Relationship[0]'] },

    // ---- Part 7. Interpreter's Contact Information, Certification, and Signature ----
    { answerKey: 'interpreterLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt7Line1a_InterpreterFamilyName[0]'] },
    { answerKey: 'interpreterFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt7Line1b_InterpreterGivenName[0]'] },
    { answerKey: 'interpreterBusiness', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt7Line2_InterpreterBusinessorOrg[0]'] },
    { answerKey: 'interpreterCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt7Line3_Country[0]'] },
    { answerKey: 'interpreterAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt7Line3_StreetNumberName[0]'] },
    { answerKey: 'interpreterCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt7Line3_CityOrTown[0]'] },
    { answerKey: 'interpreterState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[9].Pt7Line3_State[0]'] },
    { answerKey: 'interpreterZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt7Line3_ZipCode[0]'] },
    { answerKey: 'interpreterLanguage', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt7_NameofLanguage[0]'] },
    { answerKey: 'interpreterDaytimePhone', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt7Line4_InterpreterDaytimeTelephone[0]'] },
    { answerKey: 'interpreterEmail', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt7Line5_Email[0]'] },

    // ---- Part 8. Contact Information, Declaration, and Signature of Preparer ----
    { answerKey: 'preparerLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt8Line1a_PreparerFamilyName[0]'] },
    { answerKey: 'preparerFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt8Line1b_PreparerGivenName[0]'] },
    { answerKey: 'preparerBusiness', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt8Line2_BusinessName[0]'] },
    { answerKey: 'preparerCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt8Line3_Country[0]'] },
    { answerKey: 'preparerAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt8Line3_StreetNumberName[0]'] },
    { answerKey: 'preparerCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt8Line3_CityOrTown[0]'] },
    { answerKey: 'preparerState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[9].Pt8Line3_State[0]'] },
    { answerKey: 'preparerZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].Pt8Line3_ZipCode[0]'] },
    { answerKey: 'preparerDaytimePhone', kind: 'text', pdfFieldNames: ['form1[0].#subform[10].Pt8Line4_DaytimePhoneNumber[0]'] },
    { answerKey: 'preparerEmail', kind: 'text', pdfFieldNames: ['form1[0].#subform[10].Pt8Line6_Email[0]'] },

    // ---- Part 9. Additional Information ----
    { answerKey: 'additionalInfoPage', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].Pt9Line3a_PageNumber[0]'] },
    { answerKey: 'additionalInfoSection', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].Pt9Line3b_PartNumber[0]'] },
    { answerKey: 'additionalInfoQuestion', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].Pt9Line3c_ItemNumber[0]'] },
    { answerKey: 'additionalInfoResponse', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].Pt9Line3d_AdditionalInfo[0]'] },
  ],
};
