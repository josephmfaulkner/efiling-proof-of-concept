import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Typography } from '@mui/material';
import { listForms, getForm } from '../../engine/registry/formRegistry';
import { createApplication } from '../../engine/persistence/applicationsRegistry';
import { Layout } from '../../components/ui/Layout';

export function LandingPage() {
  const navigate = useNavigate();
  const forms = listForms();

  function handleStart(formId: string) {
    const { manifest } = getForm(formId);
    const application = createApplication(formId, manifest.shortTitle);
    navigate(`/apply/${application.id}/wizard/${manifest.steps[0].id}`);
  }

  return (
    <Layout maxWidth="lg">
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h1" sx={{ mb: 2 }}>
          Guided Filing, Without the Guesswork
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 560, mx: 'auto', color: 'text.secondary' }}>
          Answer a few questions at a time. We track what evidence you&apos;ll need and generate
          your filled, ready-to-review PDF at the end — like tracking an order, not wrangling a
          government form.
        </Typography>
      </Box>

      <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
        {forms.map((manifest) => (
          <Paper key={manifest.id} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h3" sx={{ mb: 1 }}>
              {manifest.shortTitle}
            </Typography>
            {manifest.description && (
              <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                {manifest.description}
              </Typography>
            )}
            <Button variant="contained" onClick={() => handleStart(manifest.id)}>
              Start my application
            </Button>
          </Paper>
        ))}
      </Box>
    </Layout>
  );
}
