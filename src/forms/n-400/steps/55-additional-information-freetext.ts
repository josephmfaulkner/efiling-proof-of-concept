import type { StepSchema } from '../../../engine/schema/types';

/** Real page is a repeating "Add a response" list — see i-130/08-your-address-history.ts for the same list pattern. */
export const additionalInformationFreetextStep: StepSchema = {
  id: 'additional-information-freetext',
  section: 'Additional Information',
  title: 'Additional Information',
  description: 'If you need to provide any additional information for any of your answers to the questions in this form, enter it below. You should include the question you are referencing. If you do not need to provide any additional information, you may leave this section blank.',
  fields: [],
  repeating: {
    answerKey: 'additionalInformation',
    entryNoun: 'response',
    summaryColumnLabel: 'Response',
    summaryFieldNames: ['additionalInfoQuestion', 'additionalInfoResponse'],
    minEntries: 0,
    fields: [
      { name: 'additionalInfoQuestion', label: 'Which question are you referencing?', type: 'text' },
      { name: 'additionalInfoResponse', label: 'Response', type: 'textarea' },
    ],
  },
};
