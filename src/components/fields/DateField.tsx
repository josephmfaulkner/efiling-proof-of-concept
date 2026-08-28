import MuiTextField from '@mui/material/TextField';
import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';

interface DateFieldProps {
  field: FieldSchema;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

/** Native date input yields ISO "YYYY-MM-DD"; converted to USCIS's MM/DD/YYYY only at PDF-fill time. */
export function DateField({ field, required, register, error }: DateFieldProps) {
  return (
    <MuiTextField
      id={field.name}
      type="date"
      label={field.label}
      required={required}
      helperText={error ?? field.helpText ?? 'mm/dd/yyyy'}
      error={Boolean(error)}
      fullWidth
      margin="normal"
      sx={{ maxWidth: 260 }}
      slotProps={{ inputLabel: { shrink: true } }}
      {...register(field.name)}
    />
  );
}
