import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const partyOrGroupAffiliationsTwoStep: StepSchema = {
  id: 'party-or-group-affiliations-2',
  section: 'Moral Character',
  title: 'Party or Group Affiliations — Page 2',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    {
      name: 'usedWeaponAgainstPerson',
      label:
        'Have you EVER been a member of, involved in, or in any way associated with, or have you EVER provided money, a thing of value, services or labor, or any other assistance or support to a group that used a weapon or explosive with intent to harm another person or cause damage to property?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'usedWeaponAgainstPersonExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
    {
      name: 'engagedInKidnapping',
      label:
        'Have you EVER been a member of, involved in, or in any way associated with, or have you EVER provided money, a thing of value, services or labor, or any other assistance or support to a group that engaged (participated) in kidnapping, assassination, or hijacking or sabotage of an airplane, ship, vehicle, or other mode of transportation?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'engagedInKidnappingExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
    {
      name: 'helpGroupThreatenToUseWeapon',
      label:
        'Have you EVER been a member of, involved in, or in any way associated with, or have you EVER provided money, a thing of value, services or labor, or any other assistance or support to a group that threatened, attempted, conspired, prepared, planned, advocated for, or incited others to use a weapon against a person, engage in kidnapping, commit assassination, or hijack or sabotage transportation?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'helpGroupThreatenToUseWeaponExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
  ],
};
