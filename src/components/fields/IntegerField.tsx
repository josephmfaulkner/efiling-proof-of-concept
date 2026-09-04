import MuiTextField from '@mui/material/TextField';
import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';

interface IntegerFieldProps {
  field: FieldSchema;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

/**
 * A whole-number answer (e.g. "How many times have you been married?"). The
 * native number input keeps a stray letter or decimal point from ever being
 * typed, but the real gate is buildFieldZodType's `^\d+$` + min/max check
 * (see buildZodSchema.ts) — same enforcement point as every other field.
 */
export function IntegerField({ field, required, register, error }: IntegerFieldProps) {
  const { min, max } = field.constraints ?? {};

  return (
    <MuiTextField
      id={field.name}
      type="number"
      label={field.label}
      required={required}
      helperText={error ?? field.helpText}
      error={Boolean(error)}
      fullWidth
      margin="normal"
      sx={{ maxWidth: 200 }}
      slotProps={{
        inputLabel: { shrink: true },
        htmlInput: { min, max, step: 1, inputMode: 'numeric' },
      }}
      {...register(field.name)}
    />
  );
}
