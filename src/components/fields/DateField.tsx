import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';
import { FieldShell, inputClasses } from './FieldShell';

interface DateFieldProps {
  field: FieldSchema;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

/** Native date input yields ISO "YYYY-MM-DD"; converted to USCIS's MM/DD/YYYY only at PDF-fill time. */
export function DateField({ field, required, register, error }: DateFieldProps) {
  return (
    <FieldShell name={field.name} label={field.label} required={required} helpText={field.helpText} error={error}>
      <input
        id={field.name}
        type="date"
        className={inputClasses(error)}
        aria-invalid={Boolean(error)}
        {...register(field.name)}
      />
    </FieldShell>
  );
}
