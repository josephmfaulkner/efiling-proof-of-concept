import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';
import { FieldShell, inputClasses } from './FieldShell';

interface SelectFieldProps {
  field: FieldSchema;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

export function SelectField({ field, required, register, error }: SelectFieldProps) {
  return (
    <FieldShell name={field.name} label={field.label} required={required} helpText={field.helpText} error={error}>
      <select
        id={field.name}
        className={inputClasses(error)}
        aria-invalid={Boolean(error)}
        defaultValue=""
        {...register(field.name)}
      >
        <option value="" disabled>
          Select an option
        </option>
        {(field.options ?? []).map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
