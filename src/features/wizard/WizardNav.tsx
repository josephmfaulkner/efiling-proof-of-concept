import { Box, Button, Divider } from '@mui/material';

interface WizardNavProps {
  isFirstStep: boolean;
  onBack: () => void;
}

export function WizardNav({ isFirstStep, onBack }: WizardNavProps) {
  return (
    <>
      <Divider sx={{ mt: 4, mb: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="button" variant="outlined" onClick={onBack}>
          {isFirstStep ? 'Save & exit to dashboard' : 'Back'}
        </Button>
        <Button type="submit" variant="contained">
          Next
        </Button>
      </Box>
    </>
  );
}
