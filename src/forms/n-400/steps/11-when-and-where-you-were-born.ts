import type { StepSchema } from '../../../engine/schema/types';

export const whenAndWhereBornStep: StepSchema = {
  id: 'when-and-where-you-were-born',
  section: 'About You',
  title: 'When and Where You Were Born',
  fields: [
    { name: 'dateOfBirth', label: 'What is your date of birth?', type: 'date', constraints: { required: true } },
    {
      name: 'parentWasCitizenBefore18',
      label: 'Was your mother or father (including adoptive mother or father) a U.S. citizen before your 18th birthday?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    { name: 'countryOfBirth', label: 'What is your country of birth?', type: 'text', constraints: { required: true }, helpText: 'Use the name of the country at the time of your birth, even if the name of the country has changed.' },
  ],
};
