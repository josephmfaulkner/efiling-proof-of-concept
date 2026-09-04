import { useFormContext } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';
import { TextField } from './TextField';
import { IntegerField } from './IntegerField';
import { DateField } from './DateField';
import { SelectField } from './SelectField';
import { RadioField } from './RadioField';
import { CheckboxField } from './CheckboxField';
import { TextareaField } from './TextareaField';
import { FileField } from './FileField';

interface SchemaFieldProps {
  field: FieldSchema;
  /** From evaluateRules().visibleFields — fields with no visibleWhen are always visible. */
  visible: boolean;
  /** Static constraints.required OR a rules-engine requireField hit. */
  required: boolean;
}

/**
 * The one place a FieldSchema turns into an actual input. Adding a new
 * FieldType means adding one case here and one leaf component — every step
 * definition across every form automatically gains access to it.
 */
export function SchemaField({ field, visible, required }: SchemaFieldProps) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  if (!visible) return null;
  const error = errors[field.name]?.message as string | undefined;

  switch (field.type) {
    case 'text':
    case 'ssn':
    case 'aNumber':
      return <TextField field={field} required={required} register={register} error={error} />;
    case 'integer':
      return <IntegerField field={field} required={required} register={register} error={error} />;
    case 'date':
      return <DateField field={field} required={required} register={register} error={error} />;
    case 'select':
      return <SelectField field={field} required={required} register={register} error={error} />;
    case 'radio':
      return <RadioField field={field} required={required} control={control} error={error} />;
    case 'checkbox':
      return <CheckboxField field={field} control={control} error={error} />;
    case 'textarea':
      return <TextareaField field={field} required={required} register={register} error={error} />;
    case 'file':
      return <FileField field={field} required={required} control={control} error={error} />;
    default:
      return null;
  }
}
