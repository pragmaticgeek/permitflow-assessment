/**
 * Integration test example for the `workOrders` router
 */
import type { inferProcedureInput } from '@trpc/server';
import { createContextInner } from '../../context';
import type { AppRouter } from '../_app';
import { createCaller } from '../_app';
import { WorkOrderType } from '@prisma/client';

test('get workType', async () => {
  const ctx = await createContextInner({});
  const caller = createCaller(ctx);

  const input: inferProcedureInput<AppRouter['workType']['list']> = {
    type: WorkOrderType.INTERIOR
  };

  const response = await caller.workType.list(input);

  expect(response.items).toEqual(        
  expect.arrayContaining([      
    expect.objectContaining({   
      workType: WorkOrderType.INTERIOR              
    })
  ])
)
 

});

