import MuiTextField from '@mui/material/TextField';
import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';

interface TextareaFieldProps {
  field: FieldSchema;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

export function TextareaField({ field, required, register, error }: TextareaFieldProps) {
  return (
    <MuiTextField
      id={field.name}
      label={field.label}
      required={required}
      placeholder={field.placeholder}
      helperText={error ?? field.helpText}
      error={Boolean(error)}
      multiline
      rows={4}
      fullWidth
      margin="normal"
      slotProps={{ inputLabel: { shrink: true } }}
      {...register(field.name)}
    />
  );
}
