import type { StepSchema } from '../../../engine/schema/types';

export const describeYourselfStep: StepSchema = {
  id: 'describe-yourself',
  section: 'About You',
  title: 'Describe Yourself',
  description: 'We require you to complete the questions below to conduct background checks. Providing this information as part of your application may reduce the time you spend at your biometrics services appointment.',
  fields: [
    {
      name: 'sex',
      label: 'What is your sex?',
      type: 'radio',
      options: [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
      ],
    },
    {
      name: 'ethnicity',
      label: 'What is your ethnicity?',
      type: 'radio',
      options: [
        { value: 'H', label: 'Hispanic or Latino' },
        { value: 'N', label: 'Not Hispanic or Latino' },
      ],
    },
    { name: 'raceAmericanIndianAlaskaNative', label: 'American Indian or Alaska Native', type: 'checkbox' },
    { name: 'raceAsian', label: 'Asian', type: 'checkbox' },
    { name: 'raceBlackAfricanAmerican', label: 'Black or African American', type: 'checkbox' },
    { name: 'raceNativeHawaiianPacificIslander', label: 'Native Hawaiian or Other Pacific Islander', type: 'checkbox' },
    { name: 'raceWhite', label: 'White', type: 'checkbox' },
    {
      name: 'heightFeet',
      label: 'Feet',
      type: 'select',
      options: ['2', '3', '4', '5', '6', '7', '8'].map((v) => ({ value: v, label: v })),
    },
    {
      name: 'heightInches',
      label: 'Inches',
      type: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'].map((v) => ({ value: v, label: v })),
    },
    { name: 'weightPounds', label: 'Pounds', type: 'integer', constraints: { min: 30, max: 699 }, helpText: 'Provide a weight between 30 and 699 pounds.' },
    { name: 'eyeColor', label: 'What is the color of your eyes?', type: 'text' },
    { name: 'hairColor', label: 'What is the color of your hair?', type: 'text' },
  ],
};
