import { Avatar, Box, Container, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';
import { uswds } from '../../theme';

/**
 * A generic circular mark stands in for an agency seal on purpose — this app
 * deliberately doesn't reproduce the real USCIS/DHS emblem, even styled after
 * myUSCIS's guided filing UI.
 */
export function Masthead() {
  return (
    <Box component="header" sx={{ bgcolor: uswds.white, borderBottom: `1px solid ${uswds.baseLighter}` }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            py: 1.5,
            gap: 1,
          }}
        >
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
            <Avatar sx={{ bgcolor: uswds.primary, width: 40, height: 40 }}>
              <DescriptionIcon fontSize="small" />
            </Avatar>
            <Box>
              <Typography variant="h3" component="span" sx={{ fontSize: '1.15rem', display: 'block', lineHeight: 1.1 }}>
                myFiling
              </Typography>
              <Typography variant="caption" sx={{ color: uswds.ink }}>
                Guided filing prototype — not affiliated with USCIS or DHS
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography
              component={Link}
              to="/dashboard"
              variant="body2"
              sx={{ color: uswds.primary, fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              My Applications
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
