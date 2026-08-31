import type { StepSchema } from '../../../engine/schema/types';

/** Combines the real 2-page Prior Petitions flow (gate question + conditional detail) into one step. */
export const priorPetitionsStep: StepSchema = {
  id: 'prior-petitions',
  section: 'Other Information',
  title: 'Prior Petitions',
  fields: [
    {
      name: 'previouslyFiledPetition',
      label: 'Have you EVER previously filed a petition for this beneficiary or any other alien?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    { name: 'priorPetitionBeneficiaryFirstName', label: 'What is the full legal name of the beneficiary or alien you filed on behalf of? — Given name (first name)', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'priorPetitionBeneficiaryMiddleName', label: 'Middle name', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'priorPetitionBeneficiaryLastName', label: 'Family name (last name)', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'priorPetitionCity', label: 'Where was the petition filed? — City or town', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'priorPetitionState', label: 'State', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'priorPetitionDate', label: 'When was the petition filed?', type: 'date', visibleWhen: { event: 'showField' } },
    { name: 'priorPetitionResult', label: 'What was the result?', type: 'text', visibleWhen: { event: 'showField' } },
  ],
};
