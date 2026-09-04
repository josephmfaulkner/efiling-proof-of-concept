import type { StepSchema } from '../../../engine/schema/types';
import { beforeYouStartStep } from './01-before-you-start';
import { fillingOutOnlineStep } from './02-filling-out-online';
import { basisOfEligibilityStep } from './03-basis-of-eligibility';
import { preparerInterpreterGateStep } from './04-preparer-interpreter-gate';
import { preparerInformationStep } from './05-preparer-information';
import { interpreterInformationStep } from './06-interpreter-information';
import { yourNameStep } from './07-your-name';
import { yourContactInformationStep } from './08-your-contact-information';
import { whereYouHaveLivedStep } from './09-where-you-have-lived';
import { requestsForAccommodationsStep } from './10-requests-for-accommodations';
import { whenAndWhereBornStep } from './11-when-and-where-you-were-born';
import { immigrationInformationOneStep } from './12-immigration-information-1';
import { immigrationInformationTwoStep } from './13-immigration-information-2';
import { describeYourselfStep } from './14-describe-yourself';
import { schoolsAndEmploymentStep } from './15-schools-and-employment';
import { travelOutsideUsStep } from './16-travel-outside-us';
import { maritalStatusStep } from './17-marital-status';
import { childrenStep } from './18-children';
import { citizenshipClaimsAndVotingStep } from './19-citizenship-claims-and-voting';
import { hereditaryOrInheritedTitlesStep } from './20-hereditary-or-inherited-titles';
import { taxInformationStep } from './21-tax-information';
import { partyOrGroupAffiliationsOneStep } from './22-party-or-group-affiliations-1';
import { partyOrGroupAffiliationsTwoStep } from './23-party-or-group-affiliations-2';
import { goodMoralCharacterOneStep } from './24-good-moral-character-1';
import { goodMoralCharacterTwoStep } from './25-good-moral-character-2';
import { paramilitaryPoliceAndPrisonServiceStep } from './26-paramilitary-police-and-prison-service';
import { weaponUseAndTrainingStep } from './27-weapon-use-and-training';
import { recruitmentInformationStep } from './28-recruitment-information';
import { crimesAndOffensesOneStep } from './29-crimes-and-offenses-1';
import { crimesAndOffensesTwoStep } from './30-crimes-and-offenses-2';
import { crimesAndOffensesThreeStep } from './31-crimes-and-offenses-3';
import { illegalActivityOneStep } from './32-illegal-activity-1';
import { illegalActivityTwoStep } from './33-illegal-activity-2';
import { immigrationProceedingsStep } from './34-immigration-proceedings';
import { selectiveServiceStep } from './35-selective-service';
import { militaryServiceStep } from './36-military-service';
import { attachmentToConstitutionStep } from './37-attachment-to-constitution';
import { oathOfAllegianceOneStep } from './38-oath-of-allegiance-1';
import { oathOfAllegianceTwoStep } from './39-oath-of-allegiance-2';
import { evidenceNameChangeStep } from './40-evidence-name-change';
import { evidenceN648Step } from './41-evidence-n648';
import { evidenceLegalGuardianStep } from './42-evidence-legal-guardian';
import { evidenceMarriageCertificateStep } from './43-evidence-marriage-certificate';
import { evidenceChildSpousalSupportStep } from './44-evidence-child-spousal-support';
import { evidenceTaxDocumentsStep } from './45-evidence-tax-documents';
import { evidenceArrestsWithoutChargesStep } from './46-evidence-arrests-without-charges';
import { evidenceArrestsWithChargesStep } from './47-evidence-arrests-with-charges';
import { evidenceAlternativeSentencingStep } from './48-evidence-alternative-sentencing';
import { evidenceConvictionsSentencesStep } from './49-evidence-convictions-sentences';
import { evidenceArrestsRemovedStep } from './50-evidence-arrests-removed';
import { evidenceTrafficIncidentsStep } from './51-evidence-traffic-incidents';
import { evidenceFinesRestitutionStep } from './52-evidence-fines-restitution';
import { evidenceSelectiveServiceStatusStep } from './53-evidence-selective-service-status';
import { evidenceAdditionalStep } from './54-evidence-additional';
import { additionalInformationFreetextStep } from './55-additional-information-freetext';

/**
 * Ordered to match the real myUSCIS N-400 sidebar (see
 * myUSCIS_Pages/N-400/56_Review's full sidebar snapshot, the most complete
 * one captured). Every real evidence/upload page is a real step here, under
 * its own "Evidence" section — not routed through a separate, sidebar-
 * detached evidence checklist screen (same pattern as I-130).
 */
export const n400Steps: StepSchema[] = [
  beforeYouStartStep,
  fillingOutOnlineStep,
  basisOfEligibilityStep,
  preparerInterpreterGateStep,
  preparerInformationStep,
  interpreterInformationStep,
  yourNameStep,
  yourContactInformationStep,
  whereYouHaveLivedStep,
  requestsForAccommodationsStep,
  whenAndWhereBornStep,
  immigrationInformationOneStep,
  immigrationInformationTwoStep,
  describeYourselfStep,
  schoolsAndEmploymentStep,
  travelOutsideUsStep,
  maritalStatusStep,
  childrenStep,
  citizenshipClaimsAndVotingStep,
  hereditaryOrInheritedTitlesStep,
  taxInformationStep,
  partyOrGroupAffiliationsOneStep,
  partyOrGroupAffiliationsTwoStep,
  goodMoralCharacterOneStep,
  goodMoralCharacterTwoStep,
  paramilitaryPoliceAndPrisonServiceStep,
  weaponUseAndTrainingStep,
  recruitmentInformationStep,
  crimesAndOffensesOneStep,
  crimesAndOffensesTwoStep,
  crimesAndOffensesThreeStep,
  illegalActivityOneStep,
  illegalActivityTwoStep,
  immigrationProceedingsStep,
  selectiveServiceStep,
  militaryServiceStep,
  attachmentToConstitutionStep,
  oathOfAllegianceOneStep,
  oathOfAllegianceTwoStep,
  evidenceNameChangeStep,
  evidenceN648Step,
  evidenceLegalGuardianStep,
  evidenceMarriageCertificateStep,
  evidenceChildSpousalSupportStep,
  evidenceTaxDocumentsStep,
  evidenceArrestsWithoutChargesStep,
  evidenceArrestsWithChargesStep,
  evidenceAlternativeSentencingStep,
  evidenceConvictionsSentencesStep,
  evidenceArrestsRemovedStep,
  evidenceTrafficIncidentsStep,
  evidenceFinesRestitutionStep,
  evidenceSelectiveServiceStatusStep,
  evidenceAdditionalStep,
  additionalInformationFreetextStep,
];
