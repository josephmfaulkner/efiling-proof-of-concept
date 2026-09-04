import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const weaponUseAndTrainingStep: StepSchema = {
  id: 'weapon-use-and-training',
  section: 'Moral Character',
  title: 'Weapon Use and Training',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    {
      name: 'threatenedToUseWeaponAgainstPerson',
      label: 'Were you EVER a part of any group, or did you EVER help any group, unit, or organization that used a weapon against any person, or threatened to do so?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'threatenedToUseWeaponAgainstPersonExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
    { name: 'inGroupUsedWeaponAgainstPerson', label: 'When you were part of this group, or when you helped this group, did you EVER use a weapon against another person?', type: 'radio', options: YES_NO },
    { name: 'inGroupThreatenUseWeaponAgainstPerson', label: 'When you were part of this group, or when you helped this group, did you EVER threaten another person that you would use a weapon against that person?', type: 'radio', options: YES_NO },
    { name: 'inGroupThreatenUseWeaponAgainstPersonExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
    {
      name: 'soldOrTransportedWeapons',
      label: 'Have you EVER sold, provided, or transported weapons, or assisted any person in selling, providing, or transporting weapons, which you knew or believed would be used against another person?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'receivedMilitaryOrWeaponTraining', label: 'Have you EVER received any weapons training, paramilitary training, or other military-type training?', type: 'radio', options: YES_NO },
    { name: 'receivedMilitaryOrWeaponTrainingExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
  ],
};
