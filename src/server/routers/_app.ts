/**
 * This file contains the root router of your tRPC-backend
 */
import { createCallerFactory, publicProcedure, router } from '../trpc';
import { workOrdersRouter } from './workOrders';
import { workTypeRouter } from './workType';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'OK!'),

  workOrders: workOrdersRouter,
  workType: workTypeRouter,
});

export const createCaller = createCallerFactory(appRouter);

export type AppRouter = typeof appRouter;
