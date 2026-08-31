import type { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { uswds } from '../../theme';

/**
 * The real myUSCIS "important information" notice: a white card with an
 * 8px primary-darker left border and a subtle shadow — not a tinted
 * background (confirmed from the app's own captured component styling).
 */
export function InfoCallout({ children }: { children: ReactNode }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        borderLeft: `0.5rem solid ${uswds.primaryDarker}`,
        bgcolor: uswds.white,
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        p: 2,
        mb: 3,
        alignItems: 'flex-start',
      }}
    >
      <InfoIcon sx={{ color: uswds.primaryDarker, mt: 0.25, flexShrink: 0 }} fontSize="small" />
      <Box sx={{ color: uswds.inkDarker, fontSize: '0.95rem', lineHeight: 1.5 }}>{children}</Box>
    </Stack>
  );
}
