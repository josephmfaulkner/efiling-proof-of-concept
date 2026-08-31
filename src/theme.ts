import { createTheme } from '@mui/material/styles';

/**
 * Real design tokens extracted directly from the actual myUSCIS I-130 guided
 * e-filing app (saved page captures + embedded component sourcemaps — see
 * README). Not an approximation of USWDS defaults: these are the app's own
 * `--uscis-*` custom properties and literal colors, e.g. the required-field
 * red (#cc3333, confirmed via the app's own RequiredFieldsCopy.scss) and the
 * header/banner navy (#003366, confirmed via its real static CSS).
 */
export const uswds = {
  primary: '#005ea2',
  primaryDark: '#1a4480',
  primaryDarker: '#162e51',
  primaryLighter: '#e6f1f8',
  headerNavy: '#003366',
  linkBlue: '#006699',
  focus: '#2491ff',
  error: '#cc3333',
  errorLighter: '#f4e3e3',
  success: '#00a91c',
  successLighter: '#ecf3ec',
  inkDarkest: '#1b1b1b',
  inkDarker: '#3d4551',
  ink: '#565c65',
  base: '#71767a',
  baseLight: '#a9aeb1',
  baseLighter: '#dfe1e2',
  baseLightest: '#f0f0f0',
  bannerBg: '#f9f9f9',
  white: '#ffffff',
};

export const theme = createTheme({
  palette: {
    primary: { main: uswds.primary, dark: uswds.primaryDark, light: uswds.primaryLighter },
    error: { main: uswds.error, light: uswds.errorLighter },
    success: { main: uswds.success },
    text: { primary: uswds.inkDarker, secondary: uswds.ink },
    background: { default: uswds.baseLightest, paper: uswds.white },
    divider: uswds.baseLighter,
  },
  shape: { borderRadius: 0 },
  typography: {
    fontFamily: '"Public Sans", "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700, color: uswds.inkDarkest },
    h2: { fontSize: '1.5rem', fontWeight: 700, color: uswds.inkDarkest },
    h3: { fontSize: '1.25rem', fontWeight: 700, color: uswds.inkDarkest },
    body1: { fontSize: '1.0625rem', lineHeight: 1.5 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.5 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { backgroundColor: uswds.baseLightest },
        // USWDS's signature thick offset focus ring, applied consistently to any
        // element that becomes keyboard-focused (inputs, buttons, links).
        ':focus-visible': {
          outline: `0.25rem solid ${uswds.focus}`,
          outlineOffset: '0',
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        // Contained-primary already uses palette.primary.main/dark for its rest/hover
        // states by default, so no explicit color override is needed here.
        root: { borderRadius: 0, padding: '0.625rem 1.25rem', fontSize: '1.0625rem' },
        outlined: {
          borderWidth: 2,
          '&:hover': { borderWidth: 2, backgroundColor: uswds.primaryLighter },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          minHeight: '2.5rem',
          fontSize: '1.06rem',
          backgroundColor: uswds.white,
          '& fieldset': { borderColor: uswds.ink, borderWidth: 1 },
          '&:hover fieldset': { borderColor: uswds.inkDarkest },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { position: 'static', transform: 'none', fontWeight: 700, color: uswds.inkDarkest, marginBottom: 4 },
        shrink: { transform: 'none' },
      },
    },
    MuiFormHelperText: {
      styleOverrides: { root: { marginLeft: 0, fontSize: '0.9rem' } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
});
