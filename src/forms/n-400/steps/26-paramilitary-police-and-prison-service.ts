import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];

export const paramilitaryPoliceAndPrisonServiceStep: StepSchema = {
  id: 'paramilitary-police-and-prison-service',
  section: 'Moral Character',
  title: 'Paramilitary, Police, and Prison Service',
  description: 'When a question includes the word "EVER," you must provide information about any of your actions or conduct that occurred anywhere in the world at any time, unless the question specifies otherwise.',
  fields: [
    {
      name: 'partOfPoliceUnit',
      label: 'Have you EVER served in, been a member of, assisted (helped), or participated in any military or police unit?',
      type: 'radio',
      options: YES_NO,
    },
    {
      name: 'partOfPoliceUnitExplanation',
      label: 'Provide an explanation. Include the name of the country, the name of the military unit or armed group, your rank or position, and your dates of involvement.',
      type: 'textarea',
      visibleWhen: { event: 'showField' },
    },
    {
      name: 'partOfArmedGroup',
      label:
        'Have you EVER served in, been a member of, assisted (helped), or participated in any armed group (for example: paramilitary unit, self-defense unit, vigilante unit, rebel group, or guerrilla group)?',
      type: 'radio',
      options: YES_NO,
    },
    {
      name: 'workedAtDetentionFacility',
      label:
        'Have you EVER worked, volunteered, or otherwise served in a place where people were detained (for example, a prison, jail, prison camp, detention facility, or labor camp), or have you EVER directed or participated in any other activity that involved detaining people?',
      type: 'radio',
      options: YES_NO,
    },
    { name: 'workedAtDetentionFacilityExplanation', label: 'Provide an explanation.', type: 'textarea', visibleWhen: { event: 'showField' } },
  ],
};
