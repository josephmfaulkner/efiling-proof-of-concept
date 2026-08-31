import type { StepSchema } from '../../../engine/schema/types';

export const adjustmentOfStatusStep: StepSchema = {
  id: 'adjustment-of-status',
  section: 'Other Information',
  title: 'Adjustment of Status',
  content: [
    { type: 'heading', level: 4, text: 'You should only answer the first set of questions if the beneficiary is in the United States and will apply for adjustment of status at a USCIS office in the United States.' },
    { type: 'paragraph', text: 'If the beneficiary will apply for adjustment of status to lawful permanent resident inside the United States, you must provide the location of the USCIS office where the beneficiary will apply for an immigrant visa.' },
  ],
  fields: [
    { name: 'adjustmentUscisOfficeCity', label: 'At which USCIS office will the beneficiary apply for adjustment of status to lawful permanent resident? — City or town', type: 'text' },
    { name: 'adjustmentUscisOfficeState', label: 'State', type: 'text' },
    { name: 'adjustmentEmbassyCountry', label: 'At which U.S. Embassy or Consulate location will the beneficiary apply for an immigrant visa? — Country', type: 'text' },
    { name: 'adjustmentEmbassyCity', label: 'City or town', type: 'text' },
    { name: 'adjustmentEmbassyProvince', label: 'Province', type: 'text' },
  ],
};
