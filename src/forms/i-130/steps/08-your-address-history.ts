import type { StepSchema } from '../../../engine/schema/types';

/**
 * The real myUSCIS page presents this as a repeating add/edit list ("Save
 * address" / "Cancel"). As with the I-485 travel-history equivalent, this PoC
 * scopes repeating groups down to a single most-recent entry — a genuinely
 * new field type, not a metadata change — so only one address is captured here.
 */
export const yourAddressHistoryStep: StepSchema = {
  id: 'your-address-history',
  section: 'About You',
  title: 'Your Address History',
  description: 'Where have you lived during the last five years? This proof-of-concept captures your most recent address only.',
  fields: [
    { name: 'addressHistoryCountry', label: 'Country', type: 'text', constraints: { required: true } },
    { name: 'addressHistoryLine1', label: 'Address line 1', type: 'text', constraints: { required: true }, helpText: 'Street number and name' },
    { name: 'addressHistoryLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
    { name: 'addressHistoryCity', label: 'City or town', type: 'text', constraints: { required: true } },
    { name: 'addressHistoryState', label: 'State', type: 'text' },
    { name: 'addressHistoryZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
    { name: 'addressHistoryFromDate', label: 'From (MM/DD/YYYY)', type: 'date', constraints: { required: true } },
    { name: 'addressHistoryToDate', label: 'To (MM/DD/YYYY)', type: 'date', constraints: { required: true } },
  ],
};
