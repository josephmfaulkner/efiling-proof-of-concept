import type { StepSchema } from '../../../engine/schema/types';

/** Visible when marital-status's maritalStatus is not 'single'. Single-entry simplification of the real repeating list — see 08-your-address-history.ts. */
export const priorMarriagesStep: StepSchema = {
  id: 'prior-marriages',
  section: 'Your Family',
  title: 'Prior Marriages',
  visibleWhen: { event: 'showStep' },
  fields: [
    { name: 'priorSpouseFirstName', label: "What is your prior spouse's legal name? — Given name (first name)", type: 'text', constraints: { required: true } },
    { name: 'priorSpouseMiddleName', label: 'Middle name', type: 'text' },
    { name: 'priorSpouseLastName', label: 'Family name (last name)', type: 'text', constraints: { required: true } },
    { name: 'priorMarriageEndDate', label: 'When did your marriage end?', type: 'date', constraints: { required: true } },
  ],
};
