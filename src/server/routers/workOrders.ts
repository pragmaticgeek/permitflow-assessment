/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import type { Prisma  } from '@prisma/client';
import { WorkOrderType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';
import { highestPermitRequired } from '~/utils/calculatePermit';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @link https://github.com/prisma/prisma/issues/9353
 */
const defaultWorkOrderSelect = {
  id: true,
  title: true,
  description: true,
  work: {
    include: {
        workType: true
    },
  },
  type: true,
  createdAt: true,
  updatedAt: true,
  permitType: true,
} satisfies Prisma.WorkOrdersSelect;

export const workOrdersRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
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

      const items = await prisma.workOrders.findMany({
        select: defaultWorkOrderSelect,
        // get an extra item at the end which we'll use as next cursor
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          createdAt: 'desc',
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        // Remove the last item and use it as next cursor

         
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items: items,
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const post = await prisma.post.findUnique({
        where: { id },
        select: defaultWorkOrderSelect,
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return post;
    }),
  add: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(32),
        description: z.string(),
        type: z.enum([WorkOrderType.EXTERIOR, WorkOrderType.INTERIOR]),
        work: z.array(z.string().uuid()),
      }),
    )
    .mutation(async ({ input }) => {
        const workTypes = await prisma.workType.findMany({
            where: {
                id: {
                    in: input.work,
                },
            },
        });
        
      const workOrder = await prisma.workOrders.create({
        data: {
          title: input.title,
          description: input.description,
          type: input.type,
          permitType: highestPermitRequired(workTypes),
          work: {
            create: input.work.map((workTypeId)  => ({
                workType: {
                    connect: {id: workTypeId}
                }
            }))
          }
        },
        select: defaultWorkOrderSelect,
      });
      return workOrder;
    }),
});
