import { Box, Container, Stack, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import dhsSeal from '../../assets/gov/dhs_seal.svg';
import { uswds } from '../../theme';

const FOOTER_LINKS = [
  { label: 'Topics', href: 'https://www.uscis.gov/topics' },
  { label: 'Citizenship', href: 'https://www.uscis.gov/citizenship' },
  { label: 'Schedule an Appointment', href: 'https://my.uscis.gov/appointment/v2' },
  { label: 'Find a Doctor', href: 'https://www.uscis.gov/tools/find-a-civil-surgeon' },
  { label: 'Find a Class', href: 'https://www.uscis.gov/citizenship/findcitizenshiphelp' },
];

const SOCIAL_LINKS = [
  { Icon: FacebookIcon, href: 'https://www.facebook.com/uscis', label: 'Facebook' },
  { Icon: XIcon, href: 'https://www.twitter.com/uscis', label: 'X, formerly known as Twitter' },
  { Icon: YouTubeIcon, href: 'https://www.youtube.com/uscis', label: 'Youtube' },
  { Icon: InstagramIcon, href: 'https://www.instagram.com/uscis', label: 'Instagram' },
  { Icon: LinkedInIcon, href: 'https://www.linkedin.com/company/uscis', label: 'LinkedIn' },
  { Icon: EmailIcon, href: 'https://public.govdelivery.com/accounts/USDHSCIS/subscriber/new', label: 'Email' },
];

/** Modeled on the real myUSCIS footer (usa-footer + usa-identifier) — the agency-identifier text is reworded, same as the GovBanner, to stay honest about not being an official site. */
export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: uswds.white, borderTop: `1px solid ${uswds.baseLighter}`, mt: 6 }}>
      <Box sx={{ bgcolor: uswds.baseLightest, py: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {FOOTER_LINKS.map((link) => (
              <Typography
                key={link.label}
                component="a"
                href={link.href}
                target="_blank"
                rel="noreferrer"
                variant="body2"
                sx={{ color: uswds.primary, textDecoration: 'none', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
              >
                {link.label}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 3 }}>
        <Container maxWidth="lg">
          <Stack direction="row" spacing={1.5}>
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <Box
                key={label}
                component="a"
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                sx={{ color: uswds.ink, display: 'flex' }}
              >
                <Icon fontSize="small" />
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box sx={{ bgcolor: uswds.inkDarkest, py: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Box component="img" src={dhsSeal} alt="Department of Homeland Security Seal" sx={{ height: 40 }} />
            <Box>
              <Typography sx={{ color: uswds.white, fontWeight: 700 }}>myFiling (prototype)</Typography>
              <Typography variant="body2" sx={{ color: uswds.baseLight, maxWidth: 640 }}>
                Not an official website of the U.S. Department of Homeland Security or USCIS —
                an educational, local-only prototype styled after the real myUSCIS guided
                filing experience. No real filing, no server, no account.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
