import type { StepSchema } from '../../../engine/schema/types';

/** Real page uses a repeating add/edit list ("Add an address"); simplified to a single most-recent entry — same established scope decision as the other guided-filing forms' repeating groups. */
export const whereYouHaveLivedStep: StepSchema = {
  id: 'where-you-have-lived',
  section: 'About You',
  title: 'Where You Have Lived',
  description: 'List every location where you have lived during the last 5 years (last 3 years if applying as the spouse of a U.S. citizen, or under VAWA). This proof-of-concept captures your most recent address only.',
  fields: [
    { name: 'livedCountry', label: 'Country', type: 'text', constraints: { required: true } },
    { name: 'livedAddressLine1', label: 'Address line 1', type: 'text', constraints: { required: true }, helpText: 'Street number and name' },
    { name: 'livedAddressLine2', label: 'Address line 2', type: 'text', helpText: 'Apartment, suite, unit, or floor' },
    { name: 'livedCity', label: 'City or town', type: 'text', constraints: { required: true } },
    { name: 'livedState', label: 'State', type: 'text' },
    { name: 'livedZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
    { name: 'livedFromDate', label: 'From (MM/DD/YYYY)', type: 'date', constraints: { required: true } },
    { name: 'livedToDate', label: 'To (MM/DD/YYYY)', type: 'date', constraints: { required: true } },
  ],
};
