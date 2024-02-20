import { PermitType, WorkType } from '@prisma/client';

export const highestPermitRequired = (workTypes: WorkType[]) => {
  if (
    workTypes.some((workType) => workType.permitRequired === PermitType.INHOUSE)
  ) {
    return PermitType.INHOUSE;
  } else if (
    workTypes.some(
      (workType) => workType.permitRequired === PermitType.OTC_WITH_PLAN,
    )
  ) {
    return PermitType.OTC_WITH_PLAN;
  } else if (
    workTypes.some(
      (workType) => workType.permitRequired === PermitType.OTC_NO_PLAN,
    )
  ) {
    return PermitType.OTC_NO_PLAN;
  }
  return PermitType.NONE;
};
