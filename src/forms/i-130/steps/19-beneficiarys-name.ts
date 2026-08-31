import type { StepSchema } from '../../../engine/schema/types';

export const beneficiarysNameStep: StepSchema = {
  id: 'beneficiarys-name',
  section: 'Your Beneficiary',
  title: "Beneficiary's Name",
  description: "You should enter your beneficiary's information in this section and not your own information. The beneficiary is the family member for whom you are filing this petition.",
  fields: [
    { name: 'beneficiaryFirstName', label: "What is the beneficiary's current legal name? — Given name (first name)", type: 'text' },
    { name: 'beneficiaryMiddleName', label: 'Middle name', type: 'text' },
    { name: 'beneficiaryLastName', label: 'Family name (last name)', type: 'text', constraints: { required: true } },
    { name: 'beneficiaryOtherFirstName', label: 'Has the beneficiary used any other names since birth? — Given name (first name)', type: 'text' },
    { name: 'beneficiaryOtherMiddleName', label: 'Middle name', type: 'text' },
    { name: 'beneficiaryOtherLastName', label: 'Family name (last name)', type: 'text' },
  ],
};
