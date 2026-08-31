import type { StepSchema } from '../../../engine/schema/types';
import { US_STATE_OPTIONS } from '../../common/usStates';

export const passportTravelDocStep: StepSchema = {
  id: 'passport-travel-doc',
  section: 'Immigration History',
  title: 'Passport & Travel Document',
  description: 'Form I-485, Part 1, Item 10. If you last entered using a passport or travel document, provide its details.',
  fields: [
    { name: 'passportNumber', label: 'Passport or Travel Document Number Used at Last Arrival', type: 'text' },
    { name: 'passportExpirationDate', label: 'Expiration Date of this Passport or Travel Document', type: 'date' },
    { name: 'passportIssuingCountry', label: 'Country that Issued this Passport or Travel Document', type: 'text' },
    { name: 'visaNumber', label: 'Nonimmigrant Visa Number Used During Most Recent Arrival (if any)', type: 'text' },
    { name: 'visaIssuedDate', label: 'Date Nonimmigrant Visa Was Issued', type: 'date' },
    { name: 'lastArrivalCity', label: 'City or Town of Last Arrival', type: 'text' },
    { name: 'lastArrivalState', label: 'State of Last Arrival', type: 'select', options: US_STATE_OPTIONS },
    { name: 'lastArrivalDate', label: 'Date of Last Arrival', type: 'date' },
  ],
};
