import type { StepSchema } from '../../../engine/schema/types';

/** Always required — content verbatim from myUSCIS_Pages/I-130/39_2x2PhotoOfYou. */
export const photoOfYouStep: StepSchema = {
  id: 'photo-of-you',
  section: 'Evidence',
  title: '2" x 2" Photo of You',
  content: [
    { type: 'paragraph', text: 'Upload a recent color photograph of yourself that measures 2 inches by 2 inches, with your face measuring 1 inch to 1 3/8 inch from your chin to the top of your head. Your eyes should be between 1 1/8 inch and 1 3/8 inch from the bottom of the photo.' },
    { type: 'paragraph', text: 'Make sure your whole face is visible, you are facing the camera directly, and the background is white or off-white. Your head must be bare, unless contrary to your religious beliefs. Also, include an image of the back of the photograph with your name and A-Number written in pen or pencil.' },
  ],
  fields: [{ name: 'photoOfYouFile', label: 'File requirements', type: 'file', constraints: { required: true } }],
};
