/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import type { Prisma,  } from '@prisma/client';
import { WorkOrderType } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @link https://github.com/prisma/prisma/issues/9353
 */
const defaultWorkTypeSelect = {
  id: true,
  workType: true,
  code: true,
  description: true,
  order: true,
  permitRequired: true,
} satisfies Prisma.WorkTypeSelect;


export const workTypeRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
        type: z.enum([WorkOrderType.EXTERIOR, WorkOrderType.INTERIOR]),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @link https://trpc.io/docs/v11/useInfiniteQuery
       * @link https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.workType.findMany({
        select: defaultWorkTypeSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {
          workType: input.type
        },
        orderBy: {
          order: 'asc',
        },
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor

         
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
});
