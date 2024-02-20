/**
 * Integration test example for the `workOrders` router
 */
import type { inferProcedureInput } from '@trpc/server';
import { createContextInner } from '../../context';
import type { AppRouter } from '../_app';
import { createCaller } from '../_app';
import { WorkOrderType, PermitType } from '@prisma/client';

test('add workOrder', async () => {
  const ctx = await createContextInner({});
  const caller = createCaller(ctx);

  const input: inferProcedureInput<AppRouter['workOrders']['add']> = {
    title: 'test',
    description: 'description',
    type: WorkOrderType.EXTERIOR,
    work: ['83669106-1111-4046-88ed-5ebd9a124d4d']
  };

  const response = await caller.workOrders.add(input);

  expect(response.permitType).toBe(PermitType.INHOUSE);
  expect(response.work).toHaveLength(1);
  expect(response.title).toBe(input.title);
  expect(response.description).toBe(input.description);
  expect(response.type).toBe(WorkOrderType.EXTERIOR);

});

test('get workOrders', async () => {
  const ctx = await createContextInner({});
  const caller = createCaller(ctx);

  const input: inferProcedureInput<AppRouter['workOrders']['list']> = {};

  const response = await caller.workOrders.list(input);

  expect(response.items).toEqual(        
  expect.arrayContaining([      
    expect.objectContaining({   
      type: WorkOrderType.EXTERIOR              
    })
  ])
)
 

});

