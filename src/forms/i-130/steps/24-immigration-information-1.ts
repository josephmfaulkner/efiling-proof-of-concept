import type { StepSchema } from '../../../engine/schema/types';

/** hasBeenInImmigrationProceedings gates step 26 (immigration-proceedings). */
export const immigrationInformationOneStep: StepSchema = {
  id: 'immigration-information-1',
  section: 'Your Beneficiary',
  title: 'Immigration Information — Page 1',
  description: "You should enter your beneficiary's information in this section and not your own information. The beneficiary is the family member for whom you are filing this petition.",
  fields: [
    {
      name: 'beneficiaryHasBeenInUs',
      label: 'Was the beneficiary EVER in the United States?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    { name: 'beneficiaryPassportNumber', label: "What is the beneficiary's Passport number?", type: 'text' },
    { name: 'beneficiaryTravelDocumentNumber', label: "What is the beneficiary's Travel Document number?", type: 'text' },
    { name: 'beneficiaryPassportCountryOfIssuance', label: "What is the country of issuance for the beneficiary's Passport or Travel Document?", type: 'text' },
    { name: 'beneficiaryPassportExpirationDate', label: "What is the expiration date of the beneficiary's Passport or Travel Document?", type: 'date' },
    {
      name: 'beneficiaryHasBeenInImmigrationProceedings',
      label: 'Was the beneficiary EVER in immigration proceedings?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
};
