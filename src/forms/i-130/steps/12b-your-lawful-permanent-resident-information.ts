import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when additional-information-about-you's immigrationStatus === 'lpr'. */
export const yourLawfulPermanentResidentInformationStep: StepSchema = {
  id: 'your-lawful-permanent-resident-information',
  section: 'About You',
  title: 'Your Lawful Permanent Resident Information',
  visibleWhen: { event: 'showStep' },
  fields: [
    { name: 'lprClassOfAdmission', label: 'What is your class of admission?', type: 'text' },
    { name: 'lprDateOfAdmission', label: 'What was your date of admission?', type: 'date' },
    { name: 'lprAdmissionCity', label: 'City or Town', type: 'text' },
    { name: 'lprAdmissionState', label: 'State', type: 'text' },
    {
      name: 'lprThroughMarriage',
      label: 'Did you gain lawful permanent resident status through marriage to a U.S. citizen or lawful permanent resident?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
};
