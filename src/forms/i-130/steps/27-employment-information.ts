import type { StepSchema } from '../../../engine/schema/types';

export const employmentInformationStep: StepSchema = {
  id: 'employment-information',
  section: 'Your Beneficiary',
  title: 'Employment Information',
  description: "You should enter your beneficiary's information in this section and not your own information. The beneficiary is the family member for whom you are filing this petition.",
  fields: [
    { name: 'beneficiaryEmployerName', label: 'Where does the beneficiary currently work? — Name of current employer', type: 'text' },
    { name: 'beneficiaryEmployerCountry', label: 'Country', type: 'text' },
    { name: 'beneficiaryEmployerAddressLine1', label: 'Address line 1', type: 'text', helpText: 'Street number and name' },
    { name: 'beneficiaryEmployerAddressLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
    { name: 'beneficiaryEmployerCity', label: 'City or town', type: 'text' },
    { name: 'beneficiaryEmployerState', label: 'State', type: 'text' },
    { name: 'beneficiaryEmployerZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
    { name: 'beneficiaryEmploymentFromDate', label: 'When did your current employment begin?', type: 'date' },
  ],
};
