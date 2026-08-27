import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';

interface CheckboxFieldProps {
  field: FieldSchema;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

export function CheckboxField({ field, register, error }: CheckboxFieldProps) {
  return (
    <div className="mb-5">
      <label className="flex items-start gap-2 text-slate-800">
        <input id={field.name} type="checkbox" className="mt-1 h-4 w-4" {...register(field.name)} />
        <span>{field.label}</span>
      </label>
      {field.helpText && !error && <p className="mt-1 text-sm text-slate-500">{field.helpText}</p>}
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
