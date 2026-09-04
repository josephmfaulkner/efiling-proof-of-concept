import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const militaryServiceStep: StepSchema = {
  id: 'military-service',
  section: 'Moral Character',
  title: 'Military Service — Page 1',
  fields: [
    { name: 'leftUsToAvoidDraft', label: 'Have you EVER left the United States to avoid being drafted in the U.S. armed forces?', type: 'radio', options: YES_NO },
    {
      name: 'appliedForMilitaryExemption',
      label: 'Have you EVER applied for any kind of exemption from military service in the U.S. armed forces?',
      type: 'radio',
      helpText: 'If you applied for and received an exemption or discharge from the U.S. armed forces because you did not have lawful immigration status to serve, you may not be eligible for naturalization.',
      options: YES_NO,
    },
    { name: 'everServedInMilitary', label: 'Have you EVER served in the U.S. armed forces?', type: 'radio', options: YES_NO },
    { name: 'currentlyInMilitary', label: 'Are you currently a member of the U.S. armed forces?', type: 'radio', options: YES_NO },
    {
      name: 'scheduledToDeploy',
      label: 'Are you scheduled to deploy outside the United States, including to a vessel, within the next 3 months?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'currentlyStationedOutsideUs', label: 'Are you currently stationed outside the United States?', type: 'radio', options: YES_NO },
  ],
};
