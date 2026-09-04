import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when crimes-and-offenses-1's everArrested === 'Y'. */
export const evidenceTrafficIncidentsStep: StepSchema = {
  id: 'evidence-traffic-incidents',
  section: 'Evidence',
  title: 'Traffic Incidents',
  visibleWhen: { event: 'showStep' },
  content: [
    { type: 'paragraph', text: 'If you have ever been in a traffic incident that was alcohol or drug related, you must provide documentation about:' },
    { type: 'list', items: ['The involved alcohol or drugs', 'How the traffic incident led to an arrest', 'How you seriously injured another person'] },
  ],
  fields: [{ name: 'evidenceTrafficIncidentsFile', label: 'File requirements', type: 'file' }],
};
