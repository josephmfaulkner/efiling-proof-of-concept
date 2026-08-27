import type { StepSchema } from '../../../engine/schema/types';
import { yourNameStep } from './01-your-name';
import { otherNamesStep } from './02-other-names';
import { biographicInfoStep } from './03-biographic-info';
import { citizenshipIdentifiersStep } from './04-citizenship-identifiers';
import { passportTravelDocStep } from './05-passport-travel-doc';
import { applicationCategoryStep } from './06-application-category';

export const i485Steps: StepSchema[] = [
  yourNameStep,
  otherNamesStep,
  biographicInfoStep,
  citizenshipIdentifiersStep,
  passportTravelDocStep,
  applicationCategoryStep,
];
