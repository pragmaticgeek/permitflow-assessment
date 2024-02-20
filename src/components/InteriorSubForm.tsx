import { IInteriorSubFormProps } from '@/types/InteriorSubForm';
import { Checkbox } from '@uikit/checkbox';
import { useInteriorWorkListStore } from '@store/store';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';

export const InteriorSubForm = ({ form }: IInteriorSubFormProps) => {
  const { interiorWorkList } = useInteriorWorkListStore();
  return (
    <FormField
      control={form.control}
      name="interiorWork"
      render={() => (
        <FormItem>
          <FormLabel className="text-base">
            What interior work are you doing?
          </FormLabel>
          {interiorWorkList.map((workType) => (
            <FormField
              key={workType.id}
              control={form.control}
              name="work"
              render={({ field }) => {
                return (
                  <FormItem
                    key={workType.code}
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
