import type { ReactNode } from 'react';
import { Box, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { uswds } from '../../theme';

/** The blue-left-border "i" callout used throughout myUSCIS for contextual guidance. */
export function InfoCallout({ children }: { children: ReactNode }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{
        borderLeft: `4px solid ${uswds.primaryDark}`,
        bgcolor: uswds.primaryLighter,
        p: 2,
        mb: 3,
        alignItems: 'flex-start',
      }}
    >
      <InfoIcon sx={{ color: uswds.primaryDark, mt: 0.25, flexShrink: 0 }} fontSize="small" />
      <Box sx={{ color: uswds.inkDarker, fontSize: '0.95rem', lineHeight: 1.5 }}>{children}</Box>
    </Stack>
  );
}
