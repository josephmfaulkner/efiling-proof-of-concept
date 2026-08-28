import { useState } from 'react';
import { Box, Collapse, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockIcon from '@mui/icons-material/Lock';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { uswds } from '../../theme';

/**
 * Styled after USWDS's ".gov banner" pattern (the gray strip + flag + "Here's
 * how you know" every real federal site carries). The wording is deliberately
 * changed from the real banner's "An official website of..." — this is a
 * local prototype, not a federal site, and that specific sentence is the one
 * piece of this UI worth not reusing verbatim.
 */
export function GovBanner() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ bgcolor: uswds.baseLightest, borderBottom: `1px solid ${uswds.baseLighter}` }}>
      <Container maxWidth="lg" sx={{ py: 0.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.8rem' }}>
          <span role="img" aria-label="" style={{ fontSize: '1.1rem' }}>
            🇺🇸
          </span>
          <Typography variant="caption" sx={{ color: uswds.inkDarker }}>
            This is a prototype of a U.S. government-style website
          </Typography>
          <Box
            component="button"
            onClick={() => setOpen((v) => !v)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.25,
              border: 'none',
              background: 'none',
              color: uswds.primary,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem',
              fontFamily: 'inherit',
              px: 0,
            }}
            aria-expanded={open}
          >
            Here&apos;s how you know
            <ExpandMoreIcon
              fontSize="small"
              sx={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
            />
          </Box>
        </Box>
        <Collapse in={open}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, py: 2 }}>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <AccountBalanceIcon sx={{ color: uswds.ink, mt: 0.25 }} />
              <Typography variant="body2" sx={{ color: uswds.inkDarker, maxWidth: 420 }}>
                <strong>This is a non-official demo.</strong> It is not affiliated with USCIS or
                DHS — an educational proof of concept only, styled after the real myUSCIS guided
                filing experience.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <LockIcon sx={{ color: uswds.ink, mt: 0.25 }} />
              <Typography variant="body2" sx={{ color: uswds.inkDarker, maxWidth: 420 }}>
                Nothing you enter here leaves your browser. There is no server, no account, and
                no real filing submitted.
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
}
