import type { StepSchema } from '../../../engine/schema/types';

/** Visible when beneficiary-marital-status's beneficiaryMaritalStatus is not 'single'. Single-entry simplification — see 08-your-address-history.ts. */
export const priorSpousesStep: StepSchema = {
  id: 'prior-spouses',
  section: "Beneficiary's Family",
  title: "Beneficiary's Prior Spouses",
  visibleWhen: { event: 'showStep' },
  description: "What is the beneficiary's prior spouse's legal name?",
  fields: [
    { name: 'beneficiaryPriorSpouseFirstName', label: 'Given name (first name)', type: 'text', constraints: { required: true } },
    { name: 'beneficiaryPriorSpouseMiddleName', label: 'Middle name', type: 'text' },
    { name: 'beneficiaryPriorSpouseLastName', label: 'Family name (last name)', type: 'text', constraints: { required: true } },
    { name: 'beneficiaryPriorMarriageEndDate', label: "When did the beneficiary's marriage end?", type: 'date', constraints: { required: true } },
  ],
};
