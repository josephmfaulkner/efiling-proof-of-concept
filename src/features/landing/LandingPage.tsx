import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, MenuItem, Paper, Select, Typography, type SelectChangeEvent } from '@mui/material';
import { listForms, getForm } from '../../engine/registry/formRegistry';
import { createApplication } from '../../engine/persistence/applicationsRegistry';
import { Layout } from '../../components/ui/Layout';

export function LandingPage() {
  const navigate = useNavigate();
  const forms = listForms();
  const [selectedFormId, setSelectedFormId] = useState('');
  const selectedManifest = forms.find((m) => m.id === selectedFormId);

  function handleStart() {
    if (!selectedFormId) return;
    const { manifest } = getForm(selectedFormId);
    const application = createApplication(selectedFormId, manifest.shortTitle);
    navigate(`/apply/${application.id}/wizard/${manifest.steps[0].id}`);
  }

  return (
    <Layout maxWidth="sm">
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

      <Paper variant="outlined" sx={{ p: { xs: 3, sm: 5 } }}>
        <Typography component="label" htmlFor="form-select" sx={{ fontWeight: 600, display: 'block', mb: 1 }}>
          Which form would you like to file?
        </Typography>
        <Select
          id="form-select"
          fullWidth
          displayEmpty
          value={selectedFormId}
          onChange={(event: SelectChangeEvent) => setSelectedFormId(event.target.value)}
          sx={{ mb: 3 }}
        >
          <MenuItem value="" disabled>
            Select a form
          </MenuItem>
          {forms.map((manifest) => (
            <MenuItem key={manifest.id} value={manifest.id}>
              {manifest.shortTitle}
            </MenuItem>
          ))}
        </Select>

        {selectedManifest?.description && (
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
            {selectedManifest.description}
          </Typography>
        )}

        <Button variant="contained" disabled={!selectedFormId} onClick={handleStart}>
          Start my application
        </Button>
      </Paper>
    </Layout>
  );
}
