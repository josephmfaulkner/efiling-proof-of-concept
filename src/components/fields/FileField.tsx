import { Controller, type Control, type FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';
import { FieldShell } from './FieldShell';

interface FileFieldProps {
  field: FieldSchema;
  required: boolean;
  control: Control<FieldValues>;
  error?: string;
}

/** No backend in this PoC — this simulates "upload" by holding the File in memory only. */
export function FileField({ field, required, control, error }: FileFieldProps) {
  return (
    <FieldShell
      name={field.name}
      label={field.label}
      required={required}
      helpText={field.helpText ?? 'Demo only — the file name is recorded, nothing is actually uploaded.'}
      error={error}
    >
      <Controller
        name={field.name}
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <div>
            <input
              id={field.name}
              ref={ref}
              type="file"
              className="block w-full text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
              onChange={(e) => onChange(e.target.files?.[0])}
            />
            {value instanceof File && (
              <p className="mt-1 text-sm text-slate-600">
                Attached: {value.name} ({Math.round(value.size / 1024)} KB)
              </p>
            )}
          </div>
        )}
      />
    </FieldShell>
  );
}
