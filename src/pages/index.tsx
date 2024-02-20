import { WorkOrderType } from '@prisma/client';
import { trpc } from '@utils/trpc';
import type { NextPageWithLayout } from './_app';
import { useEffect } from 'react';
import PermitForm from '@components/PermitForm';
import {
  useExteriorWorkListStore,
  useInteriorWorkListStore,
} from '@store/store';
import { WorkOrderListing } from '@components/WorkOrderListing';

const IndexPage: NextPageWithLayout = () => {
  const { setExteriorWorkList } = useExteriorWorkListStore();
  const { setInteriorWorkList } = useInteriorWorkListStore();

  const exteriorWorkTypesQuery = trpc.workType.list.useInfiniteQuery(
    {
      type: WorkOrderType.EXTERIOR,
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  const interiorWorkTypesQuery = trpc.workType.list.useInfiniteQuery(
    {
      type: WorkOrderType.INTERIOR,
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  useEffect(() => {
    const allInteriorWork =
      interiorWorkTypesQuery.data?.pages.flatMap((page) => page.items) ?? [];
    setInteriorWorkList(allInteriorWork);
  }, [interiorWorkTypesQuery?.data, setInteriorWorkList]);

  useEffect(() => {
    const allExteriorWork =
      exteriorWorkTypesQuery.data?.pages.flatMap((page) => page.items) ?? [];
    setExteriorWorkList(allExteriorWork);
  }, [exteriorWorkTypesQuery?.data, setExteriorWorkList]);

  return (
    <div className="flex flex-col py-8">
      <h1 className="text-4xl font-bold">
        PermitFlow - Assessment - Kevin Wong
      </h1>
      <section className="my-8">
        <PermitForm />
      </section>
      <hr />
      <section className="my-8">
        <WorkOrderListing />
      </section>
    </div>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/v11/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
