import type { StepSchema } from '../../../engine/schema/types';

/** Content condensed from the real myUSCIS N-400 "Before You Start" page — see myUSCIS_Pages/N-400/1_BeforeYouStart. */
export const beforeYouStartStep: StepSchema = {
  id: 'before-you-start',
  section: 'Getting Started',
  title: 'Before You Start',
  fields: [],
  content: [
    { type: 'paragraph', text: 'Form N-400, Application for Naturalization, is an application to become a naturalized U.S. citizen. Naturalization is the process you take to voluntarily become a U.S. citizen if you were born outside of the United States.' },
    { type: 'heading', level: 2, text: 'Before You Start Your Application' },
    { type: 'heading', level: 3, text: 'Eligibility' },
    { type: 'paragraph', text: 'You will need to select your basis for eligibility after you start your application. In general, you may apply for naturalization when you meet all the requirements to become a U.S. citizen:' },
    {
      type: 'list',
      items: [
        'You are at least 18 years of age when you file',
        'You have been a lawful permanent resident of the United States for at least 5 years',
        'You have demonstrated continuous residence and physical presence in the United States',
        'You demonstrate good moral character',
        'You demonstrate an attachment to the principles of the U.S. Constitution',
        'You demonstrate a basic knowledge of U.S. history and government, and an ability to read, write, speak, and understand basic English',
        'You are willing to take the Oath of Allegiance to the United States',
      ],
    },
    { type: 'heading', level: 3, text: 'Fee' },
    { type: 'paragraph', text: 'We will automatically calculate the cost for you when you submit your application. Refund policy: USCIS does not refund fees, regardless of any action we take on your application.' },
    { type: 'heading', level: 3, text: 'Documents you may need' },
    { type: 'paragraph', text: 'We will automatically determine which documents you need to provide as you fill out your application, based on your personal history, family, and circumstances.' },
    { type: 'heading', level: 3, text: 'Biometric services appointment' },
    { type: 'paragraph', text: 'USCIS may require you to appear for an interview and provide biometrics (fingerprints, photograph, and/or signature) at any time to verify your identity and conduct background and security checks.' },
    { type: 'heading', level: 2, text: 'After You Submit Your Application' },
    { type: 'paragraph', text: 'After you submit your form, you can track its status through your USCIS account. We will contact you to schedule a biometrics appointment, then an interview at a local USCIS field office, where you will take the civics and English tests. Once approved, you will take the Oath of Allegiance and receive your Certificate of Naturalization.' },
  ],
};
