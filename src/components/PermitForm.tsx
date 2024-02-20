'use client';

import { ExteriorSubForm } from './ExteriorSubForm';
import { InteriorSubForm } from './InteriorSubForm';
import { trpc } from '@utils/trpc';
import { WorkOrderType } from '@prisma/client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@uikit/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Input } from '@uikit/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@uikit/radio-group';
import { zodResolver } from '@hookform/resolvers/zod';

export const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters long.' })
    .max(50, { message: 'Title must be less than 50 characters long.' }),
  description: z.string(),
  workType: z
    .enum([WorkOrderType.EXTERIOR, WorkOrderType.INTERIOR], {
      required_error:
        'You need to select either Exterior changes or Interior changes.',
    })
    .nullable(),
  work: z.array(z.string()).refine((data) => data.length >= 1, {
    message: 'Must have at least one selected work task',
  }),
});

export default function PermitForm() {
  const utils = trpc.useUtils();

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

  const addWorkOrder = trpc.workOrders.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
      await utils.workOrders.list.invalidate();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      workType: null,
      work: [],
    },
  });

  const onSubmit = (data: any) => {
    if (data.workType === WorkOrderType.EXTERIOR && addWorkOrder) {
      addWorkOrder.mutateAsync({
        title: data.title,
        description: data.description,
        type: WorkOrderType.EXTERIOR,
        work: data.work,
      });
    } else if (data.workType === WorkOrderType.INTERIOR && addWorkOrder) {
      addWorkOrder.mutateAsync({
        title: data.title,
        description: data.description,
        type: WorkOrderType.INTERIOR,
        work: data.work,
      });
    }
    form.reset();
  };

  const watchWorkType = form.watch('workType');
  return (
    <div className="w-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="my-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a work order title" {...field} />
                  </FormControl>
                  <FormDescription>Name of your work order.</FormDescription>
                  <FormMessage />
                </>
              )}
            />
          </div>
          <div className="my-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a work order description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Description of your work order.
                  </FormDescription>
                  <FormMessage />
                </>
              )}
            />
          </div>
          <div className="my-4">
            <FormField
              control={form.control}
              name="workType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>What residential work are you doing?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={WorkOrderType.EXTERIOR} />
                        </FormControl>
                        <FormLabel className="font-normal">Exterior</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={WorkOrderType.INTERIOR} />
                        </FormControl>
                        <FormLabel className="font-normal">Interior</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {watchWorkType === WorkOrderType.INTERIOR &&
          interiorWorkTypesQuery?.data ? (
            <InteriorSubForm form={form} />
          ) : null}
          {watchWorkType === WorkOrderType.EXTERIOR &&
          exteriorWorkTypesQuery?.data ? (
            <ExteriorSubForm form={form} />
          ) : null}

          <Button
            className="my-8"
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
