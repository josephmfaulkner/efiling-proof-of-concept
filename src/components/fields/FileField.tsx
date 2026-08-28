import { Box, List, ListItem, Typography } from '@mui/material';
import { Controller, type Control, type FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';
import { uswds } from '../../theme';
import { DropZone } from './DropZone';

const REQUIREMENTS = [
  'Clear and readable',
  'Accepted file formats: JPG, JPEG, PDF, TIF, or TIFF',
  'No encrypted or password-protected files',
  'Maximum size: 12MB per file',
];

interface FileFieldProps {
  field: FieldSchema;
  required: boolean;
  control: Control<FieldValues>;
  error?: string;
}

/** No backend in this PoC — this simulates "upload" by holding the File in memory only. */
export function FileField({ field, required, control, error }: FileFieldProps) {
  return (
    <Box sx={{ my: 2 }}>
      <Typography component="label" htmlFor={field.name} sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
        {field.label}
        {required && <Box component="span" sx={{ color: 'error.main' }}> *</Box>}
      </Typography>
      {field.helpText && (
        <Typography variant="body2" sx={{ color: uswds.ink, mb: 1.5 }}>
          {field.helpText}
        </Typography>
      )}

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
        File requirements
      </Typography>
      <List dense sx={{ listStyleType: 'disc', pl: 3, mb: 2, py: 0 }}>
        {REQUIREMENTS.map((r) => (
          <ListItem key={r} sx={{ display: 'list-item', p: 0 }}>
            <Typography variant="body2" sx={{ color: uswds.inkDarker }}>
              {r}
            </Typography>
          </ListItem>
        ))}
      </List>

      <Controller
        name={field.name}
        control={control}
        render={({ field: { onChange, value } }) => <DropZone id={field.name} value={value} onChange={onChange} />}
      />
      {error && (
        <Typography variant="caption" sx={{ color: 'error.main', display: 'block', mt: 0.5 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
