import { useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { uswds } from '../../theme';

interface DropZoneProps {
  id: string;
  value: File | null | undefined;
  onChange: (file: File | undefined) => void;
}

/** The dashed "Choose or drop files here to upload" pattern, reused by FileField and the evidence checklist. */
export function DropZone({ id, value, onChange }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Box
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) onChange(file);
      }}
      sx={{
        // Real colors from the app's own EvidenceUploaderDropzone.scss.
        border: '2px dashed',
        borderColor: isDragging ? '#00476b' : '#cccccc',
        bgcolor: isDragging ? '#e6f5fd' : '#f9f9f9',
        p: 3,
        textAlign: 'center',
      }}
    >
      <input
        ref={inputRef}
        id={id}
        type="file"
        style={{ display: 'none' }}
        onChange={(e) => onChange(e.target.files?.[0])}
      />
      <Typography variant="body2">
        <Box
          component="button"
          type="button"
          onClick={() => inputRef.current?.click()}
          sx={{
            border: 'none',
            background: 'none',
            color: uswds.primary,
            fontWeight: 700,
            cursor: 'pointer',
            p: 0,
            fontSize: 'inherit',
            fontFamily: 'inherit',
            textDecoration: 'underline',
          }}
        >
          Choose
        </Box>{' '}
        or drop files here to upload
      </Typography>
      {value instanceof File && (
        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: uswds.ink }}>
          Attached: {value.name} ({Math.round(value.size / 1024)} KB) — demo only, nothing is
          actually uploaded.
        </Typography>
      )}
    </Box>
  );
}
