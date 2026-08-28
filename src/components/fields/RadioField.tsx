import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import type { UseFormRegister, FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';

interface RadioFieldProps {
  field: FieldSchema;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

export function RadioField({ field, required, register, error }: RadioFieldProps) {
  return (
    <FormControl component="fieldset" required={required} error={Boolean(error)} margin="normal" fullWidth>
      <FormLabel component="legend" sx={{ fontWeight: 600, color: 'text.primary', '&.Mui-focused': { color: 'text.primary' } }}>
        {field.label}
      </FormLabel>
      <RadioGroup row>
        {(field.options ?? []).map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            control={<Radio {...register(field.name)} />}
            label={opt.label}
          />
        ))}
      </RadioGroup>
      {(error || field.helpText) && <FormHelperText>{error ?? field.helpText}</FormHelperText>}
    </FormControl>
  );
}
