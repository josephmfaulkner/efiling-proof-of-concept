import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when relationship-to-beneficiary's filingPetitionFor === 'spouse'. Content verbatim from myUSCIS_Pages/I-130/40_PhotoOfSpouse. */
export const photoOfSpouseStep: StepSchema = {
  id: 'photo-of-spouse',
  section: 'Evidence',
  title: '2" x 2" Photo of Your Spouse',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'Upload a recent color photograph of your spouse that measures 2 inches by 2 inches, with their face measuring 1 inch to 1 3/8 inch from their chin to the top of their head. Their eyes should be between 1 1/8 inch and 1 3/8 inch from the bottom of the photo.' },
    { type: 'paragraph', text: 'Make sure their whole face is visible, they are facing the camera directly, and the background is white or off-white. Their head must be bare, unless contrary to their religious beliefs. Also, include an image of the back of the photograph with their name and A-Number written in pen or pencil.' },
  ],
  fields: [{ name: 'photoOfSpouseFile', label: 'File requirements', type: 'file' }],
};
