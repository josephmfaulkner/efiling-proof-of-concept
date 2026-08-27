import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';
import { FieldShell, inputClasses } from './FieldShell';

interface TextareaFieldProps {
  field: FieldSchema;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

export function TextareaField({ field, required, register, error }: TextareaFieldProps) {
  return (
    <FieldShell name={field.name} label={field.label} required={required} helpText={field.helpText} error={error}>
      <textarea
        id={field.name}
        rows={4}
        placeholder={field.placeholder}
        className={inputClasses(error)}
        aria-invalid={Boolean(error)}
        {...register(field.name)}
      />
    </FieldShell>
  );
}
