import type { StepSchema } from '../../../engine/schema/types';

export const beneficiarysContactInformationStep: StepSchema = {
  id: 'beneficiarys-contact-information',
  section: 'Your Beneficiary',
  title: "Beneficiary's Contact Information",
  description: "You should enter your beneficiary's information in this section and not your own information. The beneficiary is the family member for whom you are filing this petition.",
  fields: [
    { name: 'beneficiaryDaytimePhoneCountryCode', label: 'Daytime telephone number — Country code', type: 'text' },
    { name: 'beneficiaryDaytimePhoneNumber', label: 'Daytime telephone number — Phone number', type: 'text' },
    { name: 'beneficiaryMobilePhoneCountryCode', label: 'Mobile telephone number (if any) — Country code', type: 'text' },
    { name: 'beneficiaryMobilePhoneNumber', label: 'Mobile telephone number (if any) — Phone number', type: 'text' },
    { name: 'beneficiaryEmailAddress', label: 'Email address (if any)', type: 'text', helpText: 'Example: user@domain.com' },
  ],
};
