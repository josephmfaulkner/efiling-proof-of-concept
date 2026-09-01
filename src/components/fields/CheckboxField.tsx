import { Checkbox, FormControlLabel, FormHelperText } from '@mui/material';
import { Controller, type Control, type FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';

interface CheckboxFieldProps {
  field: FieldSchema;
  control: Control<FieldValues>;
  error?: string;
}

/** Same reasoning as RadioField.tsx — MUI's Checkbox needs a reactive `checked` prop, not a bare register() DOM-ref mutation, to redraw correctly on remount. */
export function CheckboxField({ field, control, error }: CheckboxFieldProps) {
  return (
    <div style={{ margin: '16px 0' }}>
      <Controller
        name={field.name}
        control={control}
        render={({ field: { value, onChange, onBlur } }) => (
          <FormControlLabel
            control={<Checkbox name={field.name} checked={Boolean(value)} onChange={onChange} onBlur={onBlur} />}
            label={field.label}
          />
        )}
      />
      {(error || field.helpText) && (
        <FormHelperText error={Boolean(error)} sx={{ ml: 4 }}>
          {error ?? field.helpText}
        </FormHelperText>
      )}
    </div>
  );
}
