import type { StepSchema } from '../../../engine/schema/types';

export const officialStatementStep: StepSchema = {
  id: 'official-statement',
  section: 'Official Statement',
  title: 'Official Statement',
  content: [
    { type: 'heading', level: 3, text: 'Religious record' },
    { type: 'paragraph', text: "Upload a copy or image of the document bearing the seal of the religious organization showing that the baptism, dedication, or comparable rite occurred within two months after birth, and showing the date and place of the child's birth, date of the religious ceremony, and the names of the parents." },
    { type: 'heading', level: 3, text: 'School record' },
    { type: 'paragraph', text: "Upload a copy or image of an official letter from school authorities of the school attended showing the date of admission to the school, the child's date of birth or age at that time, place of birth, and names of the parents." },
    { type: 'heading', level: 3, text: 'Census records' },
    { type: 'paragraph', text: 'Upload a copy or image of State or Federal census records showing the names, place of birth, date of birth, or the age of the person listed.' },
    { type: 'heading', level: 3, text: 'Written statements' },
    { type: 'paragraph', text: 'If religious, school, or census records are not available, then you may submit two or more written statements from individuals who were living at the time and who have personal knowledge of the event you are trying to prove, such as the date and place of birth, marriage, or death. The individuals making the written statements do not have to be U.S. citizens.' },
    { type: 'paragraph', text: "Each written statement must contain the following information regarding the individual making the written statement: his or her full name, address, date and place of birth, full information concerning the event, and complete details explaining how the individual acquired personal knowledge of the event." },
    { type: 'paragraph', text: "Each individual's written statement must include the following declaration: \"I declare (or certify, verify, or state) under penalty of perjury under the laws of the United States of America that the foregoing is true and correct. Executed on [date], [signature].\"" },
    { type: 'heading', level: 3, text: 'DNA test results' },
    { type: 'paragraph', text: 'If other forms of evidence have proven inconclusive, the petitioner may submit on a voluntary basis other evidence of a birth parent and birth child relationship to include deoxyribonucleic acid (DNA) testing. DNA test results will only be accepted by USCIS from parentage-testing laboratories accredited by the American Association of Blood Banks (AABB).' },
  ],
  fields: [{ name: 'officialStatementFile', label: 'File requirements', type: 'file', helpText: 'Choose or drop files here to upload.' }],
};
