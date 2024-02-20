import { IPermitTypeProps } from '@/types/PermitType';
import { InHouseProcess } from './InHouseProcess';
import { OTCSubmissionProcess } from './OTCSubmissionProcess';
import { NoPermit } from './NoPermit';
import { PermitType } from '@prisma/client';

export const PermitProcess = ({ permitType }: IPermitTypeProps) => (
  <div>
    {permitType === PermitType.INHOUSE ? <InHouseProcess /> : null}
    {permitType === PermitType.OTC_WITH_PLAN ? (
      <OTCSubmissionProcess requirePlanSets />
    ) : null}
    {permitType === PermitType.OTC_NO_PLAN ? <OTCSubmissionProcess /> : null}
    {permitType === PermitType.NONE ? <NoPermit /> : null}
  </div>
);
