import type { StepSchema } from '../../../engine/schema/types';

/** Repeating "Save response" / "Cancel" list — see 08-your-address-history.ts. Leave blank if nothing to add. */
export const additionalInformationFreetextStep: StepSchema = {
  id: 'additional-information-freetext',
  section: 'Additional Information',
  title: 'Additional Information',
  fields: [],
  repeating: {
    answerKey: 'additionalInformation',
    entryNoun: 'response',
    summaryColumnLabel: 'Response',
    summaryFieldNames: ['additionalInfoQuestion', 'additionalInfoResponse'],
    minEntries: 0,
    fields: [
      { name: 'additionalInfoSection', label: 'Section', type: 'text', constraints: { required: true } },
      { name: 'additionalInfoPage', label: 'Page', type: 'text', constraints: { required: true } },
      { name: 'additionalInfoQuestion', label: 'Question', type: 'text', constraints: { required: true } },
      { name: 'additionalInfoResponse', label: 'Additional information', type: 'textarea', constraints: { required: true } },
    ],
  },
};
