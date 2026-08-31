import { useState } from 'react';
import { Box, Collapse, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import smallUsFlag from '../../assets/gov/small-us-flag.png';
import iconDotGov from '../../assets/gov/icon-dot-gov.svg';
import iconHttps from '../../assets/gov/icon-https.svg';
import iconLock from '../../assets/gov/lock.svg';
import { uswds } from '../../theme';

/**
 * Matches the real myUSCIS `.uscis-banner-bar` markup/colors 1:1 (#F9F9F9
 * background, #003366 text, real flag/.gov/https/lock icons captured from
 * the app itself) — reworded in one place on purpose: the real banner's
 * literal "An official website of the United States government" is a factual
 * claim this prototype can't make, so that one line is changed. Everything
 * else, including the full "Here's how you know" expand copy, is verbatim.
 */
export function GovBanner() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ bgcolor: uswds.bannerBg }}>
      <Container maxWidth="lg" sx={{ py: '5px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: 12, color: uswds.headerNavy }}>
          <Box component="img" src={smallUsFlag} alt="United States flag icon" sx={{ height: 14, width: 24 }} />
          <span>This is a prototype of a U.S. government-style website</span>
          <Box
            component="button"
            onClick={() => setOpen((v) => !v)}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              border: 'none',
              background: 'none',
              color: uswds.headerNavy,
              cursor: 'pointer',
              fontSize: 12,
              fontFamily: 'inherit',
              textDecoration: 'underline',
              p: 0,
            }}
            aria-expanded={open}
          >
            Here&apos;s how you know
            <ExpandMoreIcon sx={{ fontSize: 14, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
          </Box>
        </Box>

        <Collapse in={open}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, py: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, maxWidth: 420 }}>
              <Box component="img" src={iconDotGov} alt="Official government icon" sx={{ width: '2.5rem', flexShrink: 0 }} />
              <Typography variant="body2" sx={{ color: uswds.inkDarker }}>
                <strong>Official websites use .gov</strong>
                <br />A <strong>.gov</strong> website belongs to an official government
                organization in the United States.
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, maxWidth: 420 }}>
              <Box component="img" src={iconHttps} alt="Secure HTTPS icon" sx={{ width: '2.5rem', flexShrink: 0 }} />
              <Typography variant="body2" sx={{ color: uswds.inkDarker }}>
                <strong>Secure .gov websites use HTTPS</strong>
                <br />A <strong>lock</strong> (
                <Box component="img" src={iconLock} alt="Locked padlock icon" sx={{ display: 'inline', height: '0.9em' }} />
                ) or <strong>https://</strong> means you&apos;ve safely connected to the .gov
                website. Share sensitive information only on official, secure websites.
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Container>
    </Box>
  );
}
