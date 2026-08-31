import type { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { GovBanner } from '../layout/GovBanner';
import { Masthead } from '../layout/Masthead';
import { Footer } from '../layout/Footer';
import { uswds } from '../../theme';

interface LayoutProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  /** The real wizard body spans edge-to-edge (sidebar flush left) rather than sitting in a centered, padded container — pass true to skip the Container wrapper. */
  fullBleed?: boolean;
}

export function Layout({ children, maxWidth = 'md', fullBleed = false }: LayoutProps) {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: uswds.baseLightest }}>
      <GovBanner />
      <Masthead />
      {fullBleed ? (
        <Box sx={{ flex: 1 }}>{children}</Box>
      ) : (
        <Container maxWidth={maxWidth} sx={{ flex: 1, py: 5 }}>
          {children}
        </Container>
      )}
      <Footer />
    </Box>
  );
}
