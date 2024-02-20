import { Fragment } from 'react';
import { trpc } from '@utils/trpc';
import { Button } from '@uikit/button';
import { formatDistance } from 'date-fns';
import { WorkOrderType } from '@prisma/client';
import { Badge } from '@uikit/badge';
import { Checkbox } from '@uikit/checkbox';
import { Label } from '@uikit/label';
import { PermitProcess } from '@components/permit-process/PermitProcess';

export const WorkOrderListing = () => {
  const workOrdersQuery = trpc.workOrders.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  return (
    <div className="flex flex-col items-start gap-y-2">
      <h2 className="text-3xl font-semibold">
        Work Orders
        {workOrdersQuery.status === 'pending' && '(loading)'}
      </h2>

      {workOrdersQuery.data?.pages.map((page, index) => (
        <Fragment
          key={page.items[0]?.id ? page.items[0].id : `work-order-${index}`}
        >
          {page.items.map((item) => (
            <article key={item.id} className="w-full rounded bg-muted p-8">
              <div className="flex items-center">
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <Badge className="ml-4">
                  {item.type === WorkOrderType.EXTERIOR
                    ? 'Exterior'
                    : 'Interior'}
                </Badge>
              </div>
              <div className="my-4">{item.description}</div>
              <div>
                <h4 className="font-semibold">Submitted:</h4>
                {formatDistance(new Date(), new Date(item.createdAt))}
              </div>
              <div className="my-4">
                <h4 className="font-semibold">Work involved:</h4>
                {item.work.map((work) => (
                  <div key={work.id} className="flex items-center my-2">
                    <Checkbox checked disabled />
                    <Label className="ml-2">{work.workType.description}</Label>
                  </div>
                ))}
              </div>
              <div className="my-4">
                <PermitProcess permitType={item.permitType} />
              </div>
            </article>
          ))}
        </Fragment>
      ))}

      <Button
        onClick={() => workOrdersQuery.fetchNextPage()}
        disabled={
          !workOrdersQuery.hasNextPage || workOrdersQuery.isFetchingNextPage
        }
      >
        {workOrdersQuery.isFetchingNextPage
          ? 'Loading more...'
          : workOrdersQuery.hasNextPage
          ? 'Load More'
          : 'Nothing more to load'}
      </Button>
    </div>
  );
};
