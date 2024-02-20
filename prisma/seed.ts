/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient, WorkOrderType, PermitType } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const exteriorWorkTypes = [
    {
      id: 'becf8a19-065a-4cd2-b0bb-fa77c717fe65',
      description: 'Garage door replacement',
      code: 'GARAGE_DOOR_REPLACEMENT',
      permitRequired: PermitType.OTC_WITH_PLAN
    },
    {
      id: '278390b3-ed79-461d-9eb6-f3475c70706a',
      description: 'Work on exterior doors',
      code: 'EXTERIOR_DOOR',
      permitRequired: PermitType.OTC_WITH_PLAN
    },
    {
      id: '8668c559-cf2a-48eb-856e-08d802435225',
      description: 'Re-roofing',
      code: 'REROOFING',
      permitRequired: PermitType.OTC_NO_PLAN
    },
    {
      id: 'd799e43a-0ea3-45b4-8254-b55b39a25c4e',
      description: 'Building fences less than 6 feet',
      code: 'FENCE_UNDER_6FT',
      permitRequired: PermitType.NONE
    },
    {
      id: '83669106-1111-4046-88ed-5ebd9a124d4d',
      description: 'Other',
      code: 'OTHER_EXT',
      permitRequired: PermitType.INHOUSE
    },
  ];

  const interiorWorkTypes = [
    {
      id: '64c3cbde-21bc-43a2-9e60-940acc48cddb',
      description: 'New bathroom',
      code: 'BATHROOM_NEW',
      permitRequired: PermitType.OTC_WITH_PLAN
    },
    {
      id: '59e26406-f6a9-4a67-a0c7-a63d09f9bd47',
      description: 'New laundry room',
      code: 'LAUNDRY_ROOM_NEW',
      permitRequired: PermitType.OTC_WITH_PLAN
    },
    {
      id: 'bc331acf-e613-457c-be59-4ab0d8076230',
      description: 'Bathroom remodel',
      code: 'BATHROOM_REMODEL',
      permitRequired: PermitType.OTC_NO_PLAN
    },
    {
      id: 'ff19372b-756c-4087-be2a-2fa8aadf2df0',
      description: 'Other',
      code: 'OTHER_INT',
      permitRequired: PermitType.OTC_NO_PLAN
    },
  ];


  exteriorWorkTypes.forEach(async (externalWorkType, idx) => {
    await prisma.workType.upsert({
      where: {
        id: externalWorkType.id
      },
      create: {
        id: externalWorkType.id,
        workType: WorkOrderType.EXTERIOR,
        description: externalWorkType.description,
        code: externalWorkType.code,
        permitRequired: externalWorkType.permitRequired,
        order: idx
      },
      update: {},
    })
  })

  interiorWorkTypes.forEach(async (interiorWorkType, idx) => {
    await prisma.workType.upsert({
      where: {
        id: interiorWorkType.id
      },
      create: {
        id: interiorWorkType.id,
        workType: WorkOrderType.INTERIOR,
        description: interiorWorkType.description,
        code: interiorWorkType.code,
        permitRequired: interiorWorkType.permitRequired,
        order: idx
      },
      update: {},
    })
  })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
