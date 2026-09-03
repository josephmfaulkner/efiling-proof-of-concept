import { Box, List, ListItem, Typography } from '@mui/material';
import { Controller, type Control, type FieldValues } from 'react-hook-form';
import type { FieldSchema } from '../../engine/schema/types';
import { uswds } from '../../theme';
import { DropZone } from './DropZone';

/** The exact real "File requirements" list — verbatim and identical across every real myUSCIS upload page (see myUSCIS_Pages/I-130/35-42). */
const REQUIREMENTS = [
  'Clear and readable',
  'Accepted file formats: JPG, JPEG, PDF, TIF or TIFF',
  'No encrypted or password-protected files',
  "If your documents are in a foreign language, upload a full English translation and the translator's certification with each original document.",
  'Upload no more than five documents at a time',
  'Accepted file name characters: English letters, numbers, spaces, periods, hyphens, underscores, and parentheses',
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
      {field.helpText && (
        <Typography variant="body2" sx={{ color: uswds.ink, mb: 1.5 }}>
          {field.helpText}
        </Typography>
      )}

      {/* field.label is always the literal string "File requirements" across every real
          file field this app has (I-130's evidence pages, native language, official
          statement) — rendering it as its own line duplicated this heading; the heading
          itself is the one real "File requirements" label the actual page has. */}
      <Typography component="label" htmlFor={field.name} variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5, display: 'block' }}>
        File requirements
        {required && <Box component="span" sx={{ color: 'error.main' }}> *</Box>}
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
