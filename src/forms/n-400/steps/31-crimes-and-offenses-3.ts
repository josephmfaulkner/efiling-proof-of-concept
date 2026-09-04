import type { StepSchema } from '../../../engine/schema/types';

/** Visible when crimes-and-offenses-1's everArrested === 'Y'. */
export const crimesAndOffensesThreeStep: StepSchema = {
  id: 'crimes-and-offenses-3',
  section: 'Moral Character',
  title: 'Crimes and Offenses — Page 3',
  visibleWhen: { event: 'showStep' },
  fields: [
    {
      name: 'completedSentenceOrProbation',
      label: 'If you received a suspended sentence, were placed on probation, or were paroled, have you completed your suspended sentence, probation, or parole?',
      type: 'radio',
      helpText: 'We will not approve a naturalization application while you are on probation, on parole, or under a suspended sentence.',
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
  ],
};
