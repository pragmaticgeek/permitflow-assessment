import { IExteriorSubFormProps } from '@/types/ExteriorSubForm';
import { Checkbox } from '@uikit/checkbox';
import { useExteriorWorkListStore } from '@store/store';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@uikit/form';
export const ExteriorSubForm = ({ form }: IExteriorSubFormProps) => {
  const { exteriorWorkList } = useExteriorWorkListStore();
  return (
    <FormField
      control={form.control}
      name="exteriorWork"
      render={() => (
        <FormItem>
          <FormLabel className="text-base">
            What exterior work are you doing?
          </FormLabel>
          {exteriorWorkList.map((workType) => (
            <FormField
              key={workType.id}
              control={form.control}
              name="work"
              render={({ field }) => {
                return (
                  <FormItem
                    key={workType.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(workType.id)}
                        onCheckedChange={(checked) => {
                          const fieldValue = field?.value ? field.value : [];
                          return checked
                            ? field.onChange([...fieldValue, workType.id])
                            : field.onChange(
                                fieldValue?.filter(
                                  (value: string) => value !== workType.id,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {workType.description}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
