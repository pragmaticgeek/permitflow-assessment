import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from '@components/PermitForm';

export interface IInteriorSubFormProps {
  form: UseFormReturn<
    z.infer<typeof formSchema>,
    any,
    z.infer<typeof formSchema>
  >;
}
