import type { StepSchema } from '../../../engine/schema/types';
import { beforeYouStartStep } from './01-before-you-start';
import { fillingOutOnlineStep } from './02-filling-out-online';
import { preparerInterpreterGateStep } from './03-preparer-interpreter-gate';
import { preparerInformationStep } from './04-preparer-information';
import { interpreterInformationStep } from './05-interpreter-information';
import { yourNameStep } from './06-your-name';
import { yourContactInformationStep } from './07-your-contact-information';
import { yourAddressHistoryStep } from './08-your-address-history';
import { describeYourselfStep } from './09-describe-yourself';
import { yourEmploymentHistoryStep } from './10-your-employment-history';
import { additionalInformationStep } from './11-additional-information';
import { yourUsCitizenInformationStep } from './12a-your-us-citizen-information';
import { yourLawfulPermanentResidentInformationStep } from './12b-your-lawful-permanent-resident-information';
import { maritalStatusStep } from './13-marital-status';
import { currentSpouseStep } from './14-current-spouse';
import { priorMarriagesStep } from './15-prior-marriages';
import { yourParentsOneStep } from './16-your-parents-1';
import { yourParentsTwoStep } from './17-your-parents-2';
import { relationshipToBeneficiaryStep } from './18-relationship-to-beneficiary';
import { beneficiarysNameStep } from './19-beneficiarys-name';
import { beneficiarysContactInformationStep } from './20-beneficiarys-contact-information';
import { beneficiarysAddressesStep } from './21-beneficiarys-addresses';
import { addressesLivedTogetherStep } from './22-addresses-lived-together';
import { beneficiaryAdditionalInformationStep } from './23-beneficiary-additional-information';
import { immigrationInformationOneStep } from './24-immigration-information-1';
import { immigrationInformationTwoStep } from './25-immigration-information-2';
import { immigrationProceedingsStep } from './26-immigration-proceedings';
import { employmentInformationStep } from './27-employment-information';
import { beneficiaryMaritalStatusStep } from './28-beneficiary-marital-status';
import { priorSpousesStep } from './29-prior-spouses';
import { additionalFamilyStep } from './30-additional-family';
import { adjustmentOfStatusStep } from './31-adjustment-of-status';
import { priorPetitionsStep } from './32-prior-petitions';
import { otherPetitionsStep } from './33-other-petitions';
import { nativeLanguageStep } from './34-native-language';
import { officialStatementStep } from './43-official-statement';
import { additionalInformationFreetextStep } from './44-additional-information-freetext';

/**
 * Ordered to match the real myUSCIS I-130 sidebar (see myUSCIS_Pages/I-130,
 * page 45's fullest sidebar snapshot). File-upload-only real pages (35-42:
 * Proof of Status, Proof of Marriage, photos, Form I-130A, etc.) are not
 * step files here — they're routed through the generic evidence checklist,
 * see evidence/evidenceCatalog.ts.
 */
export const i130Steps: StepSchema[] = [
  beforeYouStartStep,
  fillingOutOnlineStep,
  preparerInterpreterGateStep,
  preparerInformationStep,
  interpreterInformationStep,
  yourNameStep,
  yourContactInformationStep,
  yourAddressHistoryStep,
  describeYourselfStep,
  yourEmploymentHistoryStep,
  additionalInformationStep,
  yourUsCitizenInformationStep,
  yourLawfulPermanentResidentInformationStep,
  maritalStatusStep,
  currentSpouseStep,
  priorMarriagesStep,
  yourParentsOneStep,
  yourParentsTwoStep,
  relationshipToBeneficiaryStep,
  beneficiarysNameStep,
  beneficiarysContactInformationStep,
  beneficiarysAddressesStep,
  addressesLivedTogetherStep,
  beneficiaryAdditionalInformationStep,
  immigrationInformationOneStep,
  immigrationInformationTwoStep,
  immigrationProceedingsStep,
  employmentInformationStep,
  beneficiaryMaritalStatusStep,
  priorSpousesStep,
  additionalFamilyStep,
  adjustmentOfStatusStep,
  priorPetitionsStep,
  otherPetitionsStep,
  nativeLanguageStep,
  officialStatementStep,
  additionalInformationFreetextStep,
];
