import { Box, Container, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link, useNavigate } from 'react-router-dom';
import dhsLogo from '../../assets/gov/dhs_logo.svg';
import { uswds } from '../../theme';

/**
 * Uses the real captured DHS/USCIS logo lockup (seal + wordmark, one SVG) —
 * this app is explicitly modeled after myUSCIS for a local study/prototype,
 * not published anywhere, and every page still carries a clear
 * not-affiliated disclaimer (see GovBanner and Footer).
 */
export function Masthead() {
  const navigate = useNavigate();

  return (
    <Box component="header" sx={{ bgcolor: uswds.white, borderBottom: `3px solid ${uswds.baseLighter}` }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', py: 1 }}>
          <Box component={Link} to="/" sx={{ display: 'block', py: 1 }}>
            <Box component="img" src={dhsLogo} alt="U.S. Department of Homeland Security Seal, U.S. Citizenship and Immigration Services" sx={{ height: 64, display: 'block' }} />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <HeaderLink label="My Account" />
            <HeaderLink label="Resources" />
            <Box sx={{ width: '1px', height: 20, bgcolor: uswds.baseLighter }} />
            <Typography
              component="button"
              onClick={() => navigate('/')}
              sx={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: 18,
                color: uswds.headerNavy,
                p: 0,
              }}
            >
              Sign Out
            </Typography>
          </Box>
        </Box>
        <Typography variant="caption" sx={{ display: 'block', pb: 1, color: uswds.ink }}>
          Guided filing prototype — not affiliated with USCIS or DHS
        </Typography>
      </Container>
    </Box>
  );
}

function HeaderLink({ label }: { label: string }) {
  return (
    <Box
      component="button"
      type="button"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 18,
        color: uswds.headerNavy,
        p: 0,
        '&:hover, &:focus': { fontWeight: 700 },
      }}
    >
      {label}
      <ExpandMoreIcon sx={{ fontSize: 18 }} />
    </Box>
  );
}
