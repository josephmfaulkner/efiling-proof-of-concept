import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when additional-information-about-you's immigrationStatus === 'citizen'. */
export const yourUsCitizenInformationStep: StepSchema = {
  id: 'your-us-citizen-information',
  section: 'About You',
  title: 'Your U.S. Citizen Information',
  visibleWhen: { event: 'showStep' },
  fields: [
    {
      name: 'becameCitizenBy',
      label: 'How did you obtain U.S. citizenship?',
      type: 'radio',
      options: [
        { value: 'birth', label: 'Birth in the United States' },
        { value: 'naturalization', label: 'Naturalization' },
        { value: 'parents', label: 'Parents' },
      ],
    },
    {
      name: 'hasNaturalizationCertificate',
      label: 'Have you obtained a Certificate of Naturalization or a Certificate of Citizenship?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    { name: 'certificateNumber', label: 'What is your Certificate Number?', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'certificateIssuancePlace', label: 'Where was the Certificate issued?', type: 'text', visibleWhen: { event: 'showField' } },
    { name: 'certificateIssuanceDate', label: 'On what date was the Certificate issued?', type: 'date', visibleWhen: { event: 'showField' } },
  ],
};
