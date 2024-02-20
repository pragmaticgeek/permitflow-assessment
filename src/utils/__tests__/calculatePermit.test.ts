import { describe, it, expect } from 'vitest';
import { highestPermitRequired } from '../calculatePermit';
import { PermitType, WorkType } from '@prisma/client';

// Mock WorkType objects for testing
const workTypeInHouse: WorkType = {
    id: '1',
    description: 'InHouse Work',
    permitRequired: PermitType.INHOUSE,
    order: 0,
    workType: 'EXTERIOR',
    code: 'INHOUSE'
};

const workTypeOTCWithPlan: WorkType = {
    id: '2',
    description: 'OTC Work With Plan',
    permitRequired: PermitType.OTC_WITH_PLAN,
    order: 0,
    workType: 'EXTERIOR',
    code: 'OTC_WITH_PLAN'
};

const workTypeOTCNoPlan: WorkType = {
    id: '3',
    description: 'OTC Work No Plan',
    permitRequired: PermitType.OTC_NO_PLAN,
    order: 0,
    workType: 'EXTERIOR',
    code: 'OTC_NO_PLAN'
};

const workTypeNone: WorkType = {
    id: '4',
    description: 'No Permit Work',
    permitRequired: PermitType.NONE,
    order: 0,
    workType: 'EXTERIOR',
    code: 'NONE'
};

describe('highestPermitRequired', () => {
  it('returns INHOUSE when an in-house work type is present', () => {
    const workTypes = [workTypeNone, workTypeOTCNoPlan, workTypeInHouse];
    expect(highestPermitRequired(workTypes)).toBe(PermitType.INHOUSE);
  });

  it('returns OTC_WITH_PLAN when no in-house but OTC with plan work type is present', () => {
    const workTypes = [workTypeNone, workTypeOTCWithPlan, workTypeOTCNoPlan];
    expect(highestPermitRequired(workTypes)).toBe(PermitType.OTC_WITH_PLAN);
  });

  it('returns OTC_NO_PLAN when only OTC no plan and none work types are present', () => {
    const workTypes = [workTypeNone, workTypeOTCNoPlan];
    expect(highestPermitRequired(workTypes)).toBe(PermitType.OTC_NO_PLAN);
  });

  it('returns NONE when no permit is required for any work types', () => {
    const workTypes = [workTypeNone];
    expect(highestPermitRequired(workTypes)).toBe(PermitType.NONE);
  });

  it('correctly identifies NONE when an empty array is passed', () => {
    const workTypes: WorkType[] = [];
    expect(highestPermitRequired(workTypes)).toBe(PermitType.NONE);
  });
});
