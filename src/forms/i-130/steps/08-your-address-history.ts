import type { StepSchema } from '../../../engine/schema/types';

/**
 * Real myUSCIS page: a list of saved addresses ("Add address"), each opened
 * in a "Save address" / "Cancel" form — confirmed directly against the
 * captured page (myUSCIS_Pages/I-130/8_YourAddressHistory). The real PDF
 * template has exactly one address-history row regardless of how many
 * entries are captured here (see pdfMapping.ts), so only the first saved
 * entry reaches the generated PDF — same as every other repeating group.
 */
export const yourAddressHistoryStep: StepSchema = {
  id: 'your-address-history',
  section: 'About You',
  title: 'Your Address History',
  description: 'Where have you lived during the last five years? Provide your physical addresses for the last five years, whether inside or outside the United States.',
  fields: [],
  repeating: {
    answerKey: 'addressHistory',
    entryNoun: 'address',
    summaryColumnLabel: 'Address',
    summaryFieldNames: ['addressHistoryLine1', 'addressHistoryFromDate', 'addressHistoryToDate'],
    minEntries: 1,
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
  },
};
