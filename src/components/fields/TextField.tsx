import MuiTextField from '@mui/material/TextField';
import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';

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
    <MuiTextField
      id={field.name}
      label={field.label}
      required={required}
      placeholder={placeholder}
      helperText={error ?? field.helpText}
      error={Boolean(error)}
      fullWidth
      margin="normal"
      slotProps={{ inputLabel: { shrink: true } }}
      {...register(field.name)}
    />
  );
}
