import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when crimes-and-offenses-1's everArrested === 'Y'. */
export const evidenceArrestsRemovedStep: StepSchema = {
  id: 'evidence-arrests-removed',
  section: 'Evidence',
  title: 'Arrests or Convictions Removed From Your Records',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'If you have ever had any arrest or conviction vacated, set aside, sealed, expunged, or otherwise removed from your record, or received a pardon, you must provide:' },
    {
      type: 'list',
      items: [
        'A motion to vacate and court order vacating, setting aside, sealing, expunging, or otherwise removing the arrest or conviction',
        'An application or petition for a pardon and final decision granting it',
        'A statement from the court that no record exists of your arrest or conviction',
      ],
    },
  ],
  fields: [{ name: 'evidenceArrestsRemovedFile', label: 'File requirements', type: 'file' }],
};
