import type { PdfMappingDocument } from '../../engine/pdf/types';

/**
 * Every field name below was read directly off the real, decrypted N-400
 * AcroForm (Edition 01/20/25) with pdf-lib — not guessed. See README for how
 * the template was produced from the USCIS-distributed original.
 *
 * Like the I-130/I-485 mappings, the real form's internal field names use a
 * "PtNLineM_..." convention that frequently does NOT match the printed item
 * numbers next to them — this is a known, recurring artifact of these forms'
 * LiveCycle authoring history. Every mapping below was resolved against the
 * real printed form text (`pdftotext`) and, for the ~40 near-identical
 * Yes/No "moral character" questions in Part 9, against each checkbox's
 * actual on-page pixel position (top-to-bottom, left-to-right) — not by
 * trusting the internal Line-number label alone.
 *
 * Deliberately left unmapped, same spirit as the other forms' mappings:
 *  - Weight (3 boxed digits) and eye/hair color (fixed single-select
 *    checkbox grids fed by our free-text fields) — no clean 1:1 shape.
 *  - Current spouse detail (Part 5, items 4a-8), Selective Service
 *    registration date/number (item 22c), several Part 9 items with no
 *    corresponding field in this PoC's simplified schema (items 26d, 27,
 *    28, 29 — court-martial/desertion/alien-discharge history), and the
 *    Part 10 fee-reduction section — none of this PoC's steps collect them.
 *  - Every repeating-table's 2nd/3rd+ row (addresses, employment, travel,
 *    children, crimes) — this PoC's steps model one entry per repeating
 *    group (see the step files), mapped to the table's first row.
 *  - Every file-upload field and every signature field.
 */

const A_NUMBER_FIELDS = [
  'form1[0].#subform[0].#area[0].Line1_AlienNumber[0]',
  'form1[0].#subform[1].#area[1].Line1_AlienNumber[1]',
  'form1[0].#subform[2].#area[2].Line1_AlienNumber[2]',
  'form1[0].#subform[3].#area[3].Line1_AlienNumber[3]',
  'form1[0].#subform[4].#area[4].Line1_AlienNumber[4]',
  'form1[0].#subform[5].#area[6].Line1_AlienNumber[5]',
  'form1[0].#subform[6].#area[7].Line1_AlienNumber[6]',
  'form1[0].#subform[7].#area[8].Line1_AlienNumber[7]',
  'form1[0].#subform[8].#area[9].Line1_AlienNumber[8]',
  'form1[0].#subform[9].#area[10].Line1_AlienNumber[9]',
  'form1[0].#subform[10].#area[11].Line1_AlienNumber[10]',
  'form1[0].#subform[11].#area[12].Line1_AlienNumber[11]',
  'form1[0].#subform[12].#area[13].Line1_AlienNumber[12]',
  'form1[0].#subform[13].#area[14].Line1_AlienNumber[13]',
];
const YOUR_FAMILY_NAME_FIELDS = ['form1[0].#subform[0].P2_Line1_FamilyName[0]', 'form1[0].#subform[12].P2_Line1_FamilyName[1]'];
const YOUR_GIVEN_NAME_FIELDS = ['form1[0].#subform[0].P2_Line1_GivenName[0]', 'form1[0].#subform[12].P2_Line1_GivenName[1]'];
const YOUR_MIDDLE_NAME_FIELDS = ['form1[0].#subform[0].P2_Line1_MiddleName[0]', 'form1[0].#subform[12].P2_Line1_MiddleName[1]'];

export const n400PdfMapping: PdfMappingDocument = {
  formId: 'n-400',
  entries: [
    // ---- Part 1. Information About Your Eligibility ----
    { answerKey: 'aNumber', kind: 'text', transform: 'stripNonDigits', pdfFieldNames: A_NUMBER_FIELDS },
    {
      answerKey: 'basisOfEligibility',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'general', pdfFieldName: 'form1[0].#subform[0].Part1_Eligibility[2]' },
        { matchValue: 'spouse', pdfFieldName: 'form1[0].#subform[0].Part1_Eligibility[1]' },
        { matchValue: 'vawa', pdfFieldName: 'form1[0].#subform[0].Part1_Eligibility[0]' },
        { matchValue: 'spouseAbroadEmployment', pdfFieldName: 'form1[0].#subform[0].Part1_Eligibility[6]' },
        { matchValue: 'militaryHostilities', pdfFieldName: 'form1[0].#subform[0].Part1_Eligibility[3]' },
        { matchValue: 'militaryOneYear', pdfFieldName: 'form1[0].#subform[0].Part1_Eligibility[4]' },
        { matchValue: 'other', pdfFieldName: 'form1[0].#subform[0].Part1_Eligibility[5]' },
      ],
    },
    { answerKey: 'eligibilityOtherExplain', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].Part1Line5_OtherExplain[0]'] },

    // ---- Part 2. Information About You ----
    { answerKey: 'yourLastName', kind: 'text', pdfFieldNames: YOUR_FAMILY_NAME_FIELDS },
    { answerKey: 'yourFirstName', kind: 'text', pdfFieldNames: YOUR_GIVEN_NAME_FIELDS },
    { answerKey: 'yourMiddleName', kind: 'text', pdfFieldNames: YOUR_MIDDLE_NAME_FIELDS },
    { answerKey: 'otherNameLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].Line2_FamilyName1[0]'] },
    { answerKey: 'otherNameFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].Line3_GivenName1[0]'] },
    { answerKey: 'otherNameMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[0].Line3_MiddleName1[0]'] },
    {
      answerKey: 'wantsNameChange',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[1].P2_Line34_NameChange[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[1].P2_Line34_NameChange[0]' },
      ],
    },
    { answerKey: 'newNameLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Part2Line3_FamilyName[0]'] },
    { answerKey: 'newNameFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Part2Line4a_GivenName[0]'] },
    { answerKey: 'newNameMiddleName', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].Part2Line4a_MiddleName[0]'] },
    { answerKey: 'uscisOnlineAccountNumber', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].P2_Line6_USCISELISAcctNumber[0]'] },
    {
      answerKey: 'sex',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'M', pdfFieldName: 'form1[0].#subform[1].P2_Line7_Gender[0]' },
        { matchValue: 'F', pdfFieldName: 'form1[0].#subform[1].P2_Line7_Gender[1]' },
      ],
    },
    { answerKey: 'dateOfBirth', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[1].P2_Line8_DateOfBirth[0]'] },
    { answerKey: 'datePermanentResident', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[1].P2_Line9_DateBecamePermanentResident[0]'] },
    { answerKey: 'countryOfBirth', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].P2_Line10_CountryOfBirth[0]'] },
    { answerKey: 'countryOfCitizenship', kind: 'text', pdfFieldNames: ['form1[0].#subform[1].P2_Line11_CountryOfNationality[0]'] },
    {
      answerKey: 'parentWasCitizenBefore18',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[1].P2_Line10_claimdisability[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[1].P2_Line10_claimdisability[0]' },
      ],
    },
    {
      answerKey: 'hasDisability',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[1].P2_Line11_claimdisability[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[1].P2_Line11_claimdisability[0]' },
      ],
    },
    {
      answerKey: 'wantsSsnCard',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[1].Line12a_Checkbox[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[1].Line12a_Checkbox[0]' },
      ],
    },
    { answerKey: 'ssn', kind: 'text', transform: 'stripNonDigits', pdfFieldNames: ['form1[0].#subform[1].Line12b_SSN[0]'] },
    {
      answerKey: 'authorizesSsaDisclosure',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[1].Line12\\.c_Checkbox[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[1].Line12\\.c_Checkbox[0]' },
      ],
    },

    // ---- Part 3. Biographic Information ----
    {
      answerKey: 'ethnicity',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'H', pdfFieldName: 'form1[0].#subform[2].P7_Line1_Ethnicity[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[2].P7_Line1_Ethnicity[0]' },
      ],
    },
    { answerKey: 'raceAmericanIndianAlaskaNative', kind: 'checkbox', pdfFieldNames: ['form1[0].#subform[2].P7_Line2_Race[0]'] },
    { answerKey: 'raceAsian', kind: 'checkbox', pdfFieldNames: ['form1[0].#subform[2].P7_Line2_Race[1]'] },
    { answerKey: 'raceBlackAfricanAmerican', kind: 'checkbox', pdfFieldNames: ['form1[0].#subform[2].P7_Line2_Race[2]'] },
    { answerKey: 'raceNativeHawaiianPacificIslander', kind: 'checkbox', pdfFieldNames: ['form1[0].#subform[2].P7_Line2_Race[3]'] },
    { answerKey: 'raceWhite', kind: 'checkbox', pdfFieldNames: ['form1[0].#subform[2].P7_Line2_Race[4]'] },
    { answerKey: 'heightFeet', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[2].P7_Line3_HeightFeet[0]'] },
    { answerKey: 'heightInches', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[2].P7_Line3_HeightInches[0]'] },

    // ---- Part 4. Information About Your Residence (current physical/mailing address) ----
    { answerKey: 'livedCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].P4_Line1_Country[0]'] },
    { answerKey: 'livedAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].P4_Line1_StreetName[0]'] },
    { answerKey: 'livedAddressLine2', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].P4_Line1_Number[0]'] },
    { answerKey: 'livedCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].P4_Line1_City[0]'] },
    { answerKey: 'livedState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[2].P4_Line1_State[0]'] },
    { answerKey: 'livedZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[2].P4_Line1_ZipCode[0]'] },
    { answerKey: 'livedFromDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[2].P4_Line1_DatesofResidence[0]'] },
    { answerKey: 'livedToDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[2].P4_Line1_DatesofResidence[1]'] },
    {
      answerKey: 'mailingSameAsPhysical',
      kind: 'checkbox',
      pdfFieldNames: ['form1[0].#subform[2].Pt3_Line2a_Checkbox[1]'],
    },
    { answerKey: 'mailingInCareOf', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].P5_Line1b_InCareOfName[0]'] },
    { answerKey: 'mailingCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].P5_Line1b_Country[0]'] },
    { answerKey: 'mailingAddressLine1', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].P5_Line1b_StreetName[0]'] },
    { answerKey: 'mailingAddressLine2', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].P5_Line1b_Number[0]'] },
    { answerKey: 'mailingCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].P5_Line1b_City[0]'] },
    { answerKey: 'mailingState', kind: 'dropdown', pdfFieldNames: ['form1[0].#subform[3].P4_Line1_State[1]'] },
    { answerKey: 'mailingZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].P5_Line1b_ZipCode[0]'] },

    // ---- Part 5. Information About Your Marital History ----
    {
      answerKey: 'maritalStatus',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'single', pdfFieldName: 'form1[0].#subform[3].P10_Line1_MaritalStatus[1]' },
        { matchValue: 'married', pdfFieldName: 'form1[0].#subform[3].P10_Line1_MaritalStatus[3]' },
        { matchValue: 'divorced', pdfFieldName: 'form1[0].#subform[3].P10_Line1_MaritalStatus[0]' },
        { matchValue: 'widowed', pdfFieldName: 'form1[0].#subform[3].P10_Line1_MaritalStatus[2]' },
        { matchValue: 'separated', pdfFieldName: 'form1[0].#subform[3].P10_Line1_MaritalStatus[5]' },
        { matchValue: 'annulled', pdfFieldName: 'form1[0].#subform[3].P10_Line1_MaritalStatus[4]' },
      ],
    },
    { answerKey: 'timesMarried', kind: 'text', pdfFieldNames: ['form1[0].#subform[3].Part9Line3_TimesMarried[0]'] },

    // ---- Part 6. Information About Your Children ----
    { answerKey: 'totalNumberOfChildren', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].P11_Line1_TotalChildren[0]'] },

    // ---- Part 7. Employment and Schools (most recent entry) ----
    { answerKey: 'employerOrSchoolName', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].P7_EmployerName1[0]'] },
    { answerKey: 'employerOrSchoolCountry', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].P7_Country1[0]'] },
    { answerKey: 'employerOrSchoolCity', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].P7_City1[0]'] },
    { answerKey: 'employerOrSchoolState', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].P7_State1[0]'] },
    { answerKey: 'employerOrSchoolZip', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].P7_ZipCode1[0]'] },
    { answerKey: 'employerOrSchoolOccupation', kind: 'text', pdfFieldNames: ['form1[0].#subform[4].P7_OccupationFieldStudy1[0]'] },
    { answerKey: 'employmentFromDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[4].P7_From1[0]'] },

    // ---- Part 8. Time Outside the United States (most recent trip) ----
    { answerKey: 'tripDepartureDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[5].P8_Line1_DateLeft1[0]'] },
    { answerKey: 'tripReturnDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[5].P8_Line1_DateReturn1[0]'] },
    { answerKey: 'tripDestinationCountries', kind: 'text', pdfFieldNames: ['form1[0].#subform[5].P9_Line1_Countries1[0]'] },

    // ---- Part 9. Additional Information About You (moral character) ----
    {
      answerKey: 'claimedUsCitizenship',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[5].P9_Line1[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[5].P9_Line1[0]' },
      ],
    },
    {
      answerKey: 'registeredToVote',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[5].P9_Line2[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[5].P9_Line2[0]' },
      ],
    },
    {
      answerKey: 'oweTaxes',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[5].P9_Line3[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[5].P9_Line3[1]' },
      ],
    },
    {
      answerKey: 'calledNonResidentOnTaxReturn',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[5].P9_Line4[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[5].P9_Line4[1]' },
      ],
    },
    {
      answerKey: 'communistGroup',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[5].P9_5a[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[5].P9_5a[1]' },
      ],
    },
    {
      answerKey: 'advocatedOverthrow',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[5].P9_5b[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[5].P9_5b[1]' },
      ],
    },
    {
      answerKey: 'usedWeaponAgainstPerson',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P12_6a[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P12_6a[0]' },
      ],
    },
    {
      answerKey: 'engagedInKidnapping',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P12_6b[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P12_6b[1]' },
      ],
    },
    {
      answerKey: 'helpGroupThreatenToUseWeapon',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P12_6c[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P12_6c[0]' },
      ],
    },
    {
      answerKey: 'participatedInTorture',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line7a[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line7a[0]' },
      ],
    },
    {
      answerKey: 'participatedInGenocide',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line7\\.b\\.[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line7\\.b\\.[0]' },
      ],
    },
    {
      answerKey: 'participatedInKilling',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line7\\.c[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line7\\.c[0]' },
      ],
    },
    {
      answerKey: 'participatedInInjuring',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P11_7d[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P11_7d[0]' },
      ],
    },
    {
      answerKey: 'participatedInNonconsensualSexualContact',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line7\\.e[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line7\\.e[0]' },
      ],
    },
    {
      answerKey: 'preventedReligiousPractice',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line7\\.f[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line7\\.f[0]' },
      ],
    },
    {
      answerKey: 'persecuted',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line7\\.g[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line7\\.g[0]' },
      ],
    },
    {
      answerKey: 'partOfPoliceUnit',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line8a[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line8a[0]' },
      ],
    },
    {
      answerKey: 'partOfArmedGroup',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line8b[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line8b[0]' },
      ],
    },
    {
      answerKey: 'workedAtDetentionFacility',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line9[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line9[0]' },
      ],
    },
    {
      answerKey: 'threatenedToUseWeaponAgainstPerson',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line10a[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line10a[0]' },
      ],
    },
    {
      answerKey: 'inGroupUsedWeaponAgainstPerson',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line10b[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line10b[0]' },
      ],
    },
    {
      answerKey: 'inGroupThreatenUseWeaponAgainstPerson',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line10c[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line10c[1]' },
      ],
    },
    {
      answerKey: 'soldOrTransportedWeapons',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line11[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line11[0]' },
      ],
    },
    {
      answerKey: 'receivedMilitaryOrWeaponTraining',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line12[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line12[0]' },
      ],
    },
    {
      answerKey: 'recruitedChildSoldier',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line13[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line13[0]' },
      ],
    },
    {
      answerKey: 'usedChildInHostilities',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[6].P9_Line14[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[6].P9_Line14[0]' },
      ],
    },
    {
      answerKey: 'committedNotArrested',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[7].P9_Line15a[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[7].P9_Line15a[0]' },
      ],
    },
    {
      answerKey: 'everArrested',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[7].P9_Line15b[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[7].P9_Line15b[0]' },
      ],
    },
    // Crime/offense history table (most recent entry)
    { answerKey: 'crimeDescription', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].P12_Line29_why1[0]'] },
    { answerKey: 'crimeDate', kind: 'text', transform: 'isoDateToUsDate', pdfFieldNames: ['form1[0].#subform[7].P12_Line29_Date1[0]'] },
    { answerKey: 'crimeOutcome', kind: 'text', pdfFieldNames: ['form1[0].#subform[7].P12_Line29_Outcome1[0]'] },
    {
      answerKey: 'completedSentenceOrProbation',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[7].P12_Line16[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[7].P12_Line16[0]' },
      ],
    },
    {
      answerKey: 'engagePrositution',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P11_Line17A[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P11_Line17A[0]' },
      ],
    },
    {
      answerKey: 'traffickedControlledSubstances',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P11_Line17B[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P11_Line17B[0]' },
      ],
    },
    {
      answerKey: 'marriedMultiplePeopleAtOnce',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P11_Line17C[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P11_Line17C[0]' },
      ],
    },
    {
      answerKey: 'marriedForImmigrationBenefit',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line17d[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line17d[0]' },
      ],
    },
    {
      answerKey: 'helpedIllegallyEnter',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line17e[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line17e[0]' },
      ],
    },
    {
      answerKey: 'illegalGambling',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line17f[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line17f[1]' },
      ],
    },
    {
      answerKey: 'failedToSupportDependents',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line17g[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line17g[0]' },
      ],
    },
    {
      answerKey: 'misrepresentedForPublicBenefit',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line17h[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line17h[0]' },
      ],
    },
    {
      answerKey: 'gaveFalseInfoToGovernment',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line18[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line18[1]' },
      ],
    },
    {
      answerKey: 'liedForEntryOrBenefits',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line19[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line19[1]' },
      ],
    },
    {
      answerKey: 'placedInRemoval',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line20[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line20[0]' },
      ],
    },
    {
      answerKey: 'everDeported',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line21[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line21[0]' },
      ],
    },
    {
      answerKey: 'wasMaleAge18To26InUs',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P9_Line22a[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P9_Line22a[0]' },
      ],
    },
    {
      answerKey: 'registeredSelectiveService',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].Pt9_Line22b[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].Pt9_Line22b[0]' },
      ],
    },
    {
      answerKey: 'leftUsToAvoidDraft',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line23[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line23[0]' },
      ],
    },
    {
      answerKey: 'appliedForMilitaryExemption',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line24[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line24[0]' },
      ],
    },
    {
      answerKey: 'everServedInMilitary',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[8].P12_Line25[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[8].P12_Line25[0]' },
      ],
    },
    {
      answerKey: 'currentlyInMilitary',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line26a[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line26a[0]' },
      ],
    },
    {
      answerKey: 'scheduledToDeploy',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line26b[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line26b[0]' },
      ],
    },
    {
      answerKey: 'currentlyStationedOutsideUs',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line26c[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line26c[0]' },
      ],
    },
    {
      answerKey: 'hasHereditaryTitle',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line30a[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line30a[1]' },
      ],
    },
    { answerKey: 'nobilityTitleDetails', kind: 'text', pdfFieldNames: ['form1[0].#subform[9].P9_NobilityTitles[0]'] },
    {
      answerKey: 'willingToGiveUpTitle',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line30b[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line30b[1]' },
      ],
    },

    // ---- Attachment to the U.S. Constitution / Oath of Allegiance (still Part 9) ----
    {
      answerKey: 'supportsConstitution',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line31[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line31[0]' },
      ],
    },
    {
      answerKey: 'understandsOath',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line32[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line32[1]' },
      ],
    },
    {
      answerKey: 'unableToTakeOathDueToDisability',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line33[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line33[1]' },
      ],
    },
    {
      answerKey: 'willingToTakeFullOath',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line34[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line34[0]' },
      ],
    },
    {
      answerKey: 'willingToBearArms',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line35[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line35[1]' },
      ],
    },
    {
      answerKey: 'willingToPerformNoncombatantService',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line36[1]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line36[0]' },
      ],
    },
    {
      answerKey: 'willingToPerformCivilianWork',
      kind: 'checkboxGroup',
      options: [
        { matchValue: 'Y', pdfFieldName: 'form1[0].#subform[9].P12_Line37[0]' },
        { matchValue: 'N', pdfFieldName: 'form1[0].#subform[9].P12_Line37[1]' },
      ],
    },

    // ---- Part 11. Applicant's Contact Information ----
    { answerKey: 'daytimePhone', kind: 'text', pdfFieldNames: ['form1[0].#subform[10].P12_Line3_Telephone[0]'] },
    { answerKey: 'mobilePhone', kind: 'text', pdfFieldNames: ['form1[0].#subform[10].P12_Line3_Mobile[0]'] },
    { answerKey: 'emailAddress', kind: 'text', pdfFieldNames: ['form1[0].#subform[10].P12_Line5_Email[0]'] },

    // ---- Part 12. Interpreter's Contact Information ----
    { answerKey: 'interpreterLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P14_Line1_nterpreterFamilyName[0]'] },
    { answerKey: 'interpreterFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P14_Line1_nterpreterGivenName[0]'] },
    { answerKey: 'interpreterBusiness', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P14_Line2_NameofBusinessorOrgName[0]'] },
    { answerKey: 'interpreterDaytimePhone', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P14_Line4_Telephone[0]'] },
    { answerKey: 'interpreterMobilePhone', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P14_Line5_Mobile[0]'] },
    { answerKey: 'interpreterEmail', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P14_Line5_EmailAddress[0]'] },
    { answerKey: 'interpreterLanguage', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P14_NameOfLanguage[0]'] },

    // ---- Part 13. Contact Information of the Preparer ----
    { answerKey: 'preparerLastName', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P15_Line1_PreparerFamilyName[0]'] },
    { answerKey: 'preparerFirstName', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P15_Line1_PreparerGivenName[0]'] },
    { answerKey: 'preparerBusiness', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P15_Line2_NameofBusinessorOrgName[0]'] },
    { answerKey: 'preparerDaytimePhone', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P15_Line4_Telephone[0]'] },
    { answerKey: 'preparerMobilePhone', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P15_Line5_Mobile[0]'] },
    { answerKey: 'preparerEmail', kind: 'text', pdfFieldNames: ['form1[0].#subform[11].P15_Line6_Email[0]'] },

    // ---- Part 14. Additional Information ----
    { answerKey: 'additionalInfoResponse', kind: 'text', pdfFieldNames: ['form1[0].#subform[12].P11_Line3D[0]'] },
  ],
};
