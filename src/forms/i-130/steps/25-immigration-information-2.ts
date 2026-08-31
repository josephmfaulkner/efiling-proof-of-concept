import type { StepSchema } from '../../../engine/schema/types';

export const immigrationInformationTwoStep: StepSchema = {
  id: 'immigration-information-2',
  section: 'Your Beneficiary',
  title: 'Immigration Information — Page 2',
  description: "You should enter your beneficiary's information in this section and not your own information. The beneficiary is the family member for whom you are filing this petition.",
  fields: [
    { name: 'beneficiaryClassOfAdmission', label: "What was the beneficiary's class of admission?", type: 'text' },
    { name: 'beneficiaryI94Number', label: "What is the beneficiary's Form I-94 Arrival-Departure Record number?", type: 'text' },
    { name: 'beneficiaryDateOfArrival', label: "What was the beneficiary's date of arrival?", type: 'date' },
    { name: 'beneficiaryStayExpirationDate', label: "When does the beneficiary's authorized stay expire?", type: 'date' },
  ],
};
