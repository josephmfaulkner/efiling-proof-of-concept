import type { StepSchema } from '../../../engine/schema/types';

/** Content condensed from the real myUSCIS N-400 "Start Application" page — see myUSCIS_Pages/N-400/2_Completing your form online. */
export const fillingOutOnlineStep: StepSchema = {
  id: 'filling-out-online',
  section: 'Getting Started',
  title: 'Completing Your Form Online',
  fields: [],
  content: [
    { type: 'heading', level: 2, text: 'Completing your form online' },
    { type: 'paragraph', text: 'Submitting your form online is the same as mailing in a completed paper form. They both gather the same information.' },
    { type: 'heading', level: 3, text: 'Complete the Getting Started section first' },
    { type: 'paragraph', text: 'You should answer all questions in the Getting Started section first so we can best customize the rest of your online form experience.' },
    { type: 'heading', level: 3, text: 'We will automatically save your responses' },
    { type: 'paragraph', text: 'We will automatically save your information when you select Next or navigate to another section — for 30 days from today, or from the last time you worked on the form.' },
    { type: 'heading', level: 2, text: 'DHS Privacy Notice' },
    { type: 'paragraph', text: 'AUTHORITIES: USCIS is collecting the information requested on this application, and the associated evidence, under INA sections 103, 316, 319, 325, 328, 329, 332, 334, 335, and 336. PURPOSE: To determine if you have established eligibility for naturalization. DISCLOSURE: Providing this information is voluntary, but failure to do so may delay a decision or result in denial.' },
    { type: 'heading', level: 2, text: 'Security reminder' },
    { type: 'paragraph', text: 'If you do not work on your application for more than 30 days, we will delete your data in order to prevent storing personal information indefinitely.' },
  ],
};
