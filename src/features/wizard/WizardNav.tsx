import { Box, Button, Divider } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface WizardNavProps {
  isFirstStep: boolean;
  onBack: () => void;
}

export function WizardNav({ isFirstStep, onBack }: WizardNavProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <>
      <Divider sx={{ mt: 4, mb: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button type="button" variant="outlined" onClick={onBack}>
          {isFirstStep ? 'Save & exit to dashboard' : 'Back'}
        </Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Next
        </Button>
      </Box>
    </>
  );
}
