import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';

interface CheckboxFieldProps {
  field: FieldSchema;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

export function CheckboxField({ field, register, error }: CheckboxFieldProps) {
  return (
    <div style={{ margin: '16px 0' }}>
      <FormControlLabel control={<Checkbox {...register(field.name)} />} label={field.label} />
      {(error || field.helpText) && (
        <FormHelperText error={Boolean(error)} sx={{ ml: 4 }}>
          {error ?? field.helpText}
        </FormHelperText>
      )}
    </div>
  );
}
