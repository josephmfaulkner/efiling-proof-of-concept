import type { ReactNode } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { GovBanner } from '../layout/GovBanner';
import { Masthead } from '../layout/Masthead';
import { uswds } from '../../theme';

export function Layout({ children, maxWidth = 'md' }: { children: ReactNode; maxWidth?: 'sm' | 'md' | 'lg' | 'xl' }) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: uswds.baseLightest }}>
      <GovBanner />
      <Masthead />
      <Container maxWidth={maxWidth} sx={{ flex: 1, py: 5 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ borderTop: `1px solid ${uswds.baseLighter}`, py: 3 }}>
        <Container maxWidth="lg">
          <Typography variant="caption" sx={{ color: uswds.base }}>
            Not affiliated with USCIS or DHS. Educational proof of concept only — not legal
            advice, and not a real filing channel.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
