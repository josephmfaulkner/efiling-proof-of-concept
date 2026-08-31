import type { StepSchema } from '../../../engine/schema/types';

/** Content condensed from the real myUSCIS I-130 "Before You Start" page — see myUSCIS_Pages/I-130/1_BeforeYouStart. */
export const beforeYouStartStep: StepSchema = {
  id: 'before-you-start',
  section: 'Getting Started',
  title: 'Before You Start',
  fields: [],
  content: [
    { type: 'paragraph', text: 'A citizen or lawful permanent resident of the United States may file Petition for Alien Relative (I-130) with USCIS to establish the existence of a relationship to certain alien relatives who wish to immigrate to the United States.' },
    { type: 'paragraph', text: 'Filing the I-130 is only the first step in helping a relative immigrate. Eligible family members must wait until a visa number is available before applying to become a lawful permanent resident. If your relative is present in the United States at that time, they can apply through Adjustment of Status. If outside the United States, they must complete consular processing with the U.S. Department of State.' },
    { type: 'heading', level: 3, text: 'Eligibility' },
    { type: 'paragraph', text: 'If you are a U.S. citizen, you must file a separate Form I-130 for each eligible relative. You may file for: your spouse; your unmarried children under 21; your unmarried sons or daughters 21 or older; your married sons or daughters of any age; or your parents (if you are 21 or older).' },
    { type: 'paragraph', text: 'If you are a lawful permanent resident, you may file for: your spouse; or your unmarried child under 21. Note: there is no visa category for married children of lawful permanent residents, and lawful permanent residents cannot file for parents or siblings.' },
    { type: 'paragraph', text: 'If you are filing for your spouse, they must complete and sign Form I-130A, Supplemental Information for Spouse Beneficiary — this is submitted with Form I-130.' },
    { type: 'heading', level: 3, text: 'Fee' },
    { type: 'paragraph', text: 'We will automatically calculate the cost for you before you submit your petition. Refund policy: USCIS does not refund fees, regardless of any action taken on your petition.' },
    { type: 'heading', level: 3, text: 'Documents you may need' },
    { type: 'paragraph', text: "We will automatically inform you which documents and additional evidence you may need to provide as you fill out your petition, based on the information you provide about your personal history, family, and circumstances." },
    { type: 'paragraph', text: 'Any document containing a foreign language must be accompanied by a full English translation that the translator has certified as complete and accurate.' },
    { type: 'heading', level: 2, text: 'After You Submit Your Petition' },
    { type: 'heading', level: 3, text: 'Track your case online' },
    { type: 'paragraph', text: 'After you submit your form, you can track its status through your USCIS account.' },
    { type: 'heading', level: 3, text: 'Respond to requests for information' },
    { type: 'paragraph', text: 'If we need more information, we will send a Request for Evidence (RFE) or Request for Information (RFI), which you can respond to through your account.' },
    { type: 'heading', level: 3, text: 'Provide your biometrics' },
    { type: 'paragraph', text: 'A few weeks after you submit your petition, we will contact you to schedule an appointment at an Application Support Center to get your fingerprints, photograph, and signature.' },
    { type: 'heading', level: 3, text: 'Receive your decision' },
    { type: 'paragraph', text: 'Once your petition is approved, we will mail you your petition decision letter with next steps for obtaining an immigrant visa.' },
  ],
};
