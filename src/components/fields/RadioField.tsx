import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';
import { FieldShell } from './FieldShell';

interface RadioFieldProps {
  field: FieldSchema;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

export function RadioField({ field, required, register, error }: RadioFieldProps) {
  return (
    <FieldShell name={field.name} label={field.label} required={required} helpText={field.helpText} error={error}>
      <div className="flex gap-6" role="radiogroup" aria-invalid={Boolean(error)}>
        {(field.options ?? []).map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-slate-800">
            <input type="radio" value={opt.value} className="h-4 w-4" {...register(field.name)} />
            {opt.label}
          </label>
        ))}
      </div>
    </FieldShell>
  );
}
