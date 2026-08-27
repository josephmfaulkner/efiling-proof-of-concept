import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';
import { FieldShell, inputClasses } from './FieldShell';

interface TextFieldProps {
  field: FieldSchema;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

/** Handles 'text', 'ssn', and 'aNumber' — all render as a single-line text input. */
export function TextField({ field, required, register, error }: TextFieldProps) {
  const placeholder =
    field.placeholder ?? (field.type === 'ssn' ? 'XXX-XX-XXXX' : field.type === 'aNumber' ? 'e.g. 012345678' : undefined);

  return (
    <FieldShell name={field.name} label={field.label} required={required} helpText={field.helpText} error={error}>
      <input
        id={field.name}
        type="text"
        placeholder={placeholder}
        className={inputClasses(error)}
        aria-invalid={Boolean(error)}
        {...register(field.name)}
      />
    </FieldShell>
  );
}
