import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when relationship-to-beneficiary's filingPetitionFor === 'spouse'. */
export const addressesLivedTogetherStep: StepSchema = {
  id: 'addresses-lived-together',
  section: 'Your Beneficiary',
  title: 'Address Where You Lived Together',
  visibleWhen: { event: 'showStep' },
  description: "You should enter your beneficiary's information in this section and not your own information. The beneficiary is the family member for whom you are filing this petition.",
  fields: [
    { name: 'livedTogetherCountry', label: 'Where did you and your spouse last live together? — Country', type: 'text' },
    { name: 'livedTogetherAddressLine1', label: 'Address line 1', type: 'text', helpText: 'Street number and name' },
    { name: 'livedTogetherAddressLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
    { name: 'livedTogetherCity', label: 'City or town', type: 'text' },
    { name: 'livedTogetherState', label: 'State', type: 'text' },
    { name: 'livedTogetherZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
    { name: 'livedTogetherFromDate', label: 'When did you and your spouse live there together? — From (MM/DD/YYYY)', type: 'date' },
    { name: 'livedTogetherToDate', label: 'To (MM/DD/YYYY)', type: 'date' },
  ],
};
