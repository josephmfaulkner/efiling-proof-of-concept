import type { StepSchema } from '../../../engine/schema/types';

/** Real page is a repeating "Save employment" / "Cancel" list — see 08-your-address-history.ts. */
export const yourEmploymentHistoryStep: StepSchema = {
  id: 'your-employment-history',
  section: 'About You',
  title: 'Your Employment History',
  fields: [],
  repeating: {
    answerKey: 'employmentHistory',
    entryNoun: 'employer',
    summaryColumnLabel: 'Employer',
    summaryFieldNames: ['employerName', 'employerCity', 'employerState'],
    minEntries: 1,
    fields: [
      { name: 'employerName', label: 'What is the name of the employer?', type: 'text', constraints: { required: true } },
      { name: 'employerCountry', label: 'Country', type: 'text' },
      { name: 'employerAddressLine1', label: 'Address line 1', type: 'text', helpText: 'Street number and name' },
      { name: 'employerAddressLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
      { name: 'employerCity', label: 'City or town', type: 'text' },
      { name: 'employerState', label: 'State', type: 'text' },
      { name: 'employerZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
      { name: 'employerOccupation', label: 'What was your occupation?', type: 'text' },
      { name: 'employmentFromDate', label: 'From (MM/DD/YYYY)', type: 'date', constraints: { required: true } },
      { name: 'employmentToPresent', label: 'I currently work here', type: 'checkbox' },
      { name: 'employmentToDate', label: 'To (MM/DD/YYYY)', type: 'date', constraints: { required: true } },
    ],
  },
};
