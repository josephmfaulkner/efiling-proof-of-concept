import type { StepSchema } from '../../../engine/schema/types';

/** Visible only when oath-of-allegiance-1's willingToTakeFullOath === 'N' (real page's modified-Oath follow-up questions). */
export const oathOfAllegianceTwoStep: StepSchema = {
  id: 'oath-of-allegiance-2',
  section: 'Oath of Allegiance',
  title: 'Oath of Allegiance — Page 2',
  visibleWhen: { event: 'showStep' },
  fields: [
    {
      name: 'willingToBearArms',
      label: 'If the law requires it, are you willing to bear arms (carry weapons) on behalf of the United States?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'willingToPerformNoncombatantService',
      label: 'If the law requires it, are you willing to perform noncombatant services in the U.S. armed forces?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'willingToPerformCivilianWork',
      label: 'If the law requires it, are you willing to perform work of national importance under civilian direction?',
      type: 'radio',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
};
