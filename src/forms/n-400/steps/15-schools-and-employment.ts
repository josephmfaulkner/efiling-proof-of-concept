import type { StepSchema } from '../../../engine/schema/types';

/** Real page uses a repeating add/edit list ("Add entry"); simplified to a single most-recent entry. */
export const schoolsAndEmploymentStep: StepSchema = {
  id: 'schools-and-employment',
  section: 'About You',
  title: 'Schools and Employment',
  description: 'Where have you worked and/or attended school (full-time or part-time) during the last 5 years (last 3 years if applying as the spouse of a U.S. citizen, or under VAWA)? This proof-of-concept captures your most recent entry only.',
  fields: [
    { name: 'employerOrSchoolName', label: 'Name of employer or school', type: 'text', constraints: { required: true } },
    { name: 'employerOrSchoolCountry', label: 'Country', type: 'text' },
    { name: 'employerOrSchoolAddressLine1', label: 'Address line 1', type: 'text', helpText: 'Street number and name' },
    { name: 'employerOrSchoolCity', label: 'City or town', type: 'text' },
    { name: 'employerOrSchoolState', label: 'State', type: 'text' },
    { name: 'employerOrSchoolZip', label: 'ZIP code', type: 'text', helpText: 'Provide a 5 or 9-digit ZIP code.' },
    { name: 'employerOrSchoolOccupation', label: 'Your occupation or course of study', type: 'text' },
    { name: 'employmentFromDate', label: 'From (MM/DD/YYYY)', type: 'date', constraints: { required: true } },
    { name: 'employmentToPresent', label: 'I currently work or study here', type: 'checkbox' },
    { name: 'employmentToDate', label: 'To (MM/DD/YYYY)', type: 'date', constraints: { required: true } },
  ],
};
