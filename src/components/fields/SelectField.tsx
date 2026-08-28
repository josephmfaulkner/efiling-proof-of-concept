import MuiTextField from '@mui/material/TextField';
import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';

interface SelectFieldProps {
  field: FieldSchema;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

export function SelectField({ field, required, register, error }: SelectFieldProps) {
  return (
    <MuiTextField
      id={field.name}
      select
      label={field.label}
      required={required}
      helperText={error ?? field.helpText}
      error={Boolean(error)}
      fullWidth
      margin="normal"
      defaultValue=""
      // A native <select> (not MUI's menu-based one) so react-hook-form's uncontrolled
      // register() — which needs a real DOM select firing native change events — binds to
      // it directly, matching every other field's registration pattern.
      slotProps={{ select: { native: true }, inputLabel: { shrink: true } }}
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
    </MuiTextField>
  );
}
