import type { StepSchema } from '../../../engine/schema/types';

/** Real page's trip list is a repeating "Add trip" list, revealed only after answering Yes — see i-130/08-your-address-history.ts for the same list pattern. */
export const travelOutsideUsStep: StepSchema = {
  id: 'travel-outside-us',
  section: 'About You',
  title: 'Travel Outside the U.S.',
  fields: [
    {
      name: 'hasTraveledOutsideUs',
      label: 'Have you taken a trip outside of the United States in the last 5 years?',
      type: 'radio',
      helpText: 'Do not include trips where the entire trip was completed within 24 hours. Applicants filing as the spouse of a U.S. citizen, or under VAWA, should answer for the last 3 years.',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
  repeating: {
    answerKey: 'trips',
    entryNoun: 'trip',
    summaryColumnLabel: 'Trip',
    summaryFieldNames: ['tripDestinationCountries', 'tripDepartureDate', 'tripReturnDate'],
    minEntries: 1,
    visibleWhen: { event: 'showField' },
    fields: [
      { name: 'tripDepartureDate', label: 'Date you left the United States (MM/DD/YYYY)', type: 'date' },
      { name: 'tripReturnDate', label: 'Date you returned to the United States (MM/DD/YYYY)', type: 'date' },
      { name: 'tripDestinationCountries', label: 'Countries you traveled to', type: 'text' },
    ],
  },
};
