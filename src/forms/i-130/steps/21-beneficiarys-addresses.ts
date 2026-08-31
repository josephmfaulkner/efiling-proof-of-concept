import type { StepSchema } from '../../../engine/schema/types';

export const beneficiarysAddressesStep: StepSchema = {
  id: 'beneficiarys-addresses',
  section: 'Your Beneficiary',
  title: "Beneficiary's Addresses",
  description: "You should enter your beneficiary's information in this section and not your own information. The beneficiary is the family member for whom you are filing this petition.",
  fields: [
    { name: 'beneficiaryPhysicalCountry', label: 'Where does the beneficiary live now? — Country', type: 'text' },
    { name: 'beneficiaryPhysicalAddressLine1', label: 'Address line 1', type: 'text', helpText: 'Street number and name' },
    { name: 'beneficiaryPhysicalAddressLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
    { name: 'beneficiaryPhysicalCity', label: 'City or town', type: 'text' },
    { name: 'beneficiaryPhysicalState', label: 'State', type: 'text' },
    { name: 'beneficiaryPhysicalZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
    { name: 'beneficiaryUsIntendedAddressLine1', label: 'Where in the United States does the beneficiary intend to live? — Address line 1', type: 'text', helpText: 'Street number and name' },
    { name: 'beneficiaryUsIntendedAddressLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
    { name: 'beneficiaryUsIntendedCity', label: 'City or town', type: 'text' },
    { name: 'beneficiaryUsIntendedState', label: 'State', type: 'text' },
    { name: 'beneficiaryUsIntendedZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
    { name: 'beneficiaryOutsideUsCountry', label: "What is the beneficiary's address outside of the United States? — Country", type: 'text' },
    { name: 'beneficiaryOutsideUsAddressLine1', label: 'Address line 1', type: 'text', helpText: 'Street number and name' },
    { name: 'beneficiaryOutsideUsAddressLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
    { name: 'beneficiaryOutsideUsCity', label: 'City or town', type: 'text' },
    { name: 'beneficiaryOutsideUsProvince', label: 'Province', type: 'text' },
    { name: 'beneficiaryOutsideUsPostalCode', label: 'Postal code', type: 'text' },
  ],
};
