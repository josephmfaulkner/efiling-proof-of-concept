import type { StepSchema } from '../../../engine/schema/types';

export const beneficiaryAdditionalInformationStep: StepSchema = {
  id: 'beneficiary-additional-information',
  section: 'Your Beneficiary',
  title: 'Additional Information',
  description: "You should enter your beneficiary's information in this section and not your own information. The beneficiary is the family member for whom you are filing this petition.",
  fields: [
    {
      name: 'beneficiaryNoANumber',
      label: 'They do not have an A-Number.',
      type: 'checkbox',
      helpText: 'The A-Number is a 7 to 9-digit immigration file number that begins with an "A". If they do not have one, USCIS may assign one to them.',
    },
    { name: 'beneficiaryANumber', label: "What is the beneficiary's A-Number?", type: 'aNumber' },
    {
      name: 'beneficiaryNoUscisOnlineAccountNumber',
      label: 'They do not have a USCIS Online Account Number.',
      type: 'checkbox',
      helpText: 'If the beneficiary previously filed using the USCIS online filing system, provide the USCIS Online Account Number they were issued.',
    },
    { name: 'beneficiaryUscisOnlineAccountNumber', label: "What is the beneficiary's USCIS Online Account Number?", type: 'text', constraints: { maxLength: 12 } },
    { name: 'beneficiaryNoSsn', label: 'They do not have an U.S. Social Security Number.', type: 'checkbox' },
    { name: 'beneficiarySsn', label: "What is the beneficiary's U.S. Social Security Number?", type: 'ssn' },
    { name: 'beneficiaryDateOfBirth', label: "What is the beneficiary's date of birth?", type: 'date', constraints: { required: true } },
    { name: 'beneficiaryCountryOfBirth', label: "What is the beneficiary's country of birth?", type: 'text' },
    { name: 'beneficiaryCityOfBirth', label: 'What is their city, town or village of birth?', type: 'text' },
    {
      name: 'beneficiaryGender',
      label: "What is the beneficiary's gender?",
      type: 'radio',
      options: [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
      ],
    },
  ],
};
