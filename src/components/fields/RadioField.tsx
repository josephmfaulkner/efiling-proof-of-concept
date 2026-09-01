import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Controller, type Control, type FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';

interface RadioFieldProps {
  field: FieldSchema;
  required: boolean;
  control: Control<FieldValues>;
  error?: string;
}

/**
 * MUI's Radio renders its checked icon from its own internal/controlled
 * state, not from the underlying native input's `checked` DOM property — a
 * bare `{...register(name)}` spread (react-hook-form's uncontrolled pattern)
 * sets that DOM property directly via ref, which the icon never sees. That
 * left a restored answer (e.g. revisiting a step, or Back/sidebar
 * navigation) with the *correct* value in form state but every radio drawn
 * unchecked. Routing the whole group through Controller/RadioGroup's own
 * value+onChange makes the checked icon reactive to react-hook-form's actual
 * value, not a one-time DOM mutation.
 */
export function RadioField({ field, required, control, error }: RadioFieldProps) {
  return (
    <FormControl component="fieldset" required={required} error={Boolean(error)} margin="normal" fullWidth>
      <FormLabel component="legend" sx={{ fontWeight: 600, color: 'text.primary', '&.Mui-focused': { color: 'text.primary' } }}>
        {field.label}
      </FormLabel>
      <Controller
        name={field.name}
        control={control}
        render={({ field: { value, onChange, onBlur, ref } }) => (
          <RadioGroup row name={field.name} value={value ?? ''} onChange={onChange} onBlur={onBlur} ref={ref}>
            {(field.options ?? []).map((opt) => (
              <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />
            ))}
          </RadioGroup>
        )}
      />
      {(error || field.helpText) && <FormHelperText>{error ?? field.helpText}</FormHelperText>}
    </FormControl>
  );
}
