import type { StepSchema } from '../../../engine/schema/types';

const YES_NO = [
  { value: 'Y', label: 'Yes' },
  { value: 'N', label: 'No' },
];
const CATALOG =
  '(including domestic violence, driving under the influence of drugs or alcohol, and crimes and offenses while you were under 18 years of age) which you EVER committed, agreed to commit, or asked someone else to commit; were arrested, cited, detained, or confined for; were charged with; pled guilty to; were convicted of; were placed in alternative sentencing or a rehabilitative program for; or received a suspended sentence, clemency, amnesty, pardon, probation, or parole for.';

export const crimesAndOffensesOneStep: StepSchema = {
  id: 'crimes-and-offenses-1',
  section: 'Moral Character',
  title: 'Crimes and Offenses — Page 1',
  content: [
    { type: 'heading', level: 4, text: 'Before you start this section' },
    {
      type: 'paragraph',
      text: 'If any of the questions on this page apply to you, you must answer "Yes" and provide information for each crime or offense even if your records have been sealed, expunged, or otherwise cleared. You must disclose this information even if someone, including a judge, told you that it is no longer on your record.',
    },
  ],
  fields: [
    {
      name: 'committedNotArrested',
      label: 'Have you EVER committed, agreed to commit, asked someone else to commit, helped commit, or tried to commit a crime or offense for which you were NOT arrested?',
      type: 'radio',
      helpText: `Include all crimes and offenses in the United States or anywhere in the world ${CATALOG}`,
      options: YES_NO,
    },
    {
      name: 'everArrested',
      label:
        'Have you EVER been arrested, cited, detained, or confined by any law enforcement officer, military official, or immigration official for any reason, or been charged with a crime or offense, or notified that you were being investigated for a crime?',
      type: 'radio',
      helpText: `Include all crimes and offenses in the United States or anywhere in the world ${CATALOG}`,
      options: YES_NO,
    },
  ],
};
