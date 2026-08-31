import type { StepSchema } from '../../../engine/schema/types';

/** Content condensed from the real myUSCIS I-130 "Filling Out Your Form Online" page — see myUSCIS_Pages/I-130/2_FillingOutYourFormOnline. */
export const fillingOutOnlineStep: StepSchema = {
  id: 'filling-out-online',
  section: 'Getting Started',
  title: 'Filling Out Your Form Online',
  fields: [],
  content: [
    { type: 'heading', level: 2, text: 'Completing your form online' },
    { type: 'paragraph', text: 'Submitting your form online is the same as mailing in a completed paper form — they both gather the same information.' },
    { type: 'heading', level: 3, text: 'Complete the Getting Started section first' },
    { type: 'paragraph', text: 'You should answer all questions in the Getting Started section first so we can best customize the rest of your online form experience.' },
    { type: 'heading', level: 3, text: 'Provide as many responses as you can' },
    { type: 'paragraph', text: 'Incomplete fields or sections and missing information can slow down processing of your case after you submit your form.' },
    { type: 'heading', level: 3, text: 'We will automatically save your responses' },
    { type: 'paragraph', text: 'We save your information when you select Next or navigate to another section — for 30 days from today, or from the last time you worked on the form.' },
    { type: 'heading', level: 2, text: 'DHS Privacy Notice' },
    { type: 'paragraph', text: 'AUTHORITIES: The information requested on this petition is collected under INA section 204. PURPOSE: To determine if you have established eligibility for the immigration benefit for which you are filing. DISCLOSURE: Providing this information is voluntary, but failure to do so may delay a decision or result in denial.' },
    { type: 'heading', level: 2, text: 'Security reminder' },
    { type: 'paragraph', text: 'If you do not work on your petition for more than 30 days, we will delete your data in order to prevent storing personal information indefinitely.' },
  ],
};
