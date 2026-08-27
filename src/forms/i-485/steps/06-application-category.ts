import type { StepSchema } from '../../../engine/schema/types';

/**
 * These 15 options are the real Part 2, Item 3.a "immigrant category" list,
 * transcribed verbatim from the actual I-485 (pages 4-5) via `pdftotext`, in
 * their real on-page order — which the PDF's own checkbox export values
 * confirm (/3a0 .. /3a14), so the value codes below map 1:1 by position to
 * `Pt2Line3a_CB[0..14]` in pdfMapping.ts.
 */
export const ELIGIBILITY_CATEGORY_OPTIONS = [
  { value: 'spouse_us_citizen', label: 'Spouse of a U.S. Citizen' },
  { value: 'unmarried_child_under21_us_citizen', label: 'Unmarried child under 21 years of age of a U.S. citizen' },
  { value: 'parent_us_citizen', label: 'Parent of a U.S. citizen (citizen at least 21 years of age)' },
  { value: 'fiancee_k1_k2', label: 'Fiancé(e) or child of a fiancé(e) of a U.S. citizen (K-1/K-2 Nonimmigrant)' },
  { value: 'widow_widower_us_citizen', label: 'Widow or widower of a U.S. citizen' },
  { value: 'ndaa_deceased_service_member', label: 'Spouse, child, or parent of a deceased U.S. active-duty service member (NDAA)' },
  { value: 'unmarried_son_daughter_21plus_us_citizen', label: 'Unmarried son or daughter (21+) of a U.S. citizen' },
  { value: 'married_son_daughter_us_citizen', label: 'Married son or daughter of a U.S. citizen' },
  { value: 'sibling_us_citizen', label: 'Brother or sister of a U.S. citizen (citizen at least 21 years of age)' },
  { value: 'spouse_lpr', label: 'Spouse of a lawful permanent resident' },
  { value: 'unmarried_child_under21_lpr', label: 'Unmarried child under 21 years of age of a lawful permanent resident' },
  { value: 'unmarried_son_daughter_21plus_lpr', label: 'Unmarried son or daughter (21+) of a lawful permanent resident' },
  { value: 'vawa_spouse', label: 'VAWA self-petitioning spouse of a U.S. citizen or lawful permanent resident' },
  { value: 'vawa_child', label: 'VAWA self-petitioning child of a U.S. citizen or lawful permanent resident' },
  { value: 'vawa_parent', label: 'VAWA self-petitioning parent of a U.S. citizen (citizen at least 21 years of age)' },
];

export const applicationCategoryStep: StepSchema = {
  id: 'application-category',
  title: 'Application Category',
  description: 'Form I-485, Part 2, Items 1 and 3.a — this is what drives which evidence you’ll need to submit.',
  fields: [
    {
      name: 'inRemovalProceedings',
      label:
        'Are you filing for adjustment of status with the Executive Office for Immigration Review (EOIR) while in removal, exclusion, rescission, or deportation proceedings?',
      type: 'radio',
      constraints: { required: true },
      options: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' },
      ],
    },
    {
      name: 'eligibilityCategory',
      label: 'I am applying based on the following category (select only one)',
      type: 'select',
      constraints: { required: true },
      options: ELIGIBILITY_CATEGORY_OPTIONS,
      helpText: 'See the Form I-485 Instructions for the full list and any category-specific requirements.',
    },
  ],
};
