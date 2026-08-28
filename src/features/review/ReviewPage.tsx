import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { getApplication } from '../../engine/persistence/applicationsRegistry';
import { getForm } from '../../engine/registry/formRegistry';
import { loadSnapshot, extractContext, jumpToStep } from '../../engine/persistence/wizardPersistence';
import type { FieldSchema } from '../../engine/schema/types';
import { Layout } from '../../components/ui/Layout';
import { uswds } from '../../theme';

function formatAnswer(field: FieldSchema, value: unknown): string {
  if (value === undefined || value === null || value === '') return '—';
  if (field.type === 'checkbox') return value ? 'Yes' : 'No';
  if ((field.type === 'select' || field.type === 'radio') && field.options) {
    return field.options.find((o) => o.value === value)?.label ?? String(value);
  }
  if (value instanceof File) return value.name;
  return String(value);
}

export function ReviewPage() {
  const { applicationId = '' } = useParams();
  const navigate = useNavigate();
  const application = getApplication(applicationId);

  if (!application) {
    return (
      <Layout>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Typography>We couldn&apos;t find that application.</Typography>
        </Paper>
      </Layout>
    );
  }

  const { manifest } = getForm(application.formId);
  const context = extractContext(loadSnapshot(applicationId));
  const answers = context?.answers ?? {};
  const visibleSteps = context?.visibleSteps ?? new Set(manifest.steps.map((s) => s.id));
  const visibleFields = context?.visibleFields ?? new Set(manifest.steps.flatMap((s) => s.fields.map((f) => f.name)));

  function handleEdit(stepId: string) {
    jumpToStep(applicationId, stepId);
    navigate(`/apply/${applicationId}/wizard/${stepId}`);
  }

  return (
    <Layout>
      <Paper variant="outlined" sx={{ p: { xs: 3, sm: 5 } }}>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Review Your Answers
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          Check everything below before generating your PDF.
        </Typography>

        <Stack spacing={4}>
          {manifest.steps
            .filter((step) => visibleSteps.has(step.id))
            .map((step) => (
              <Box component="section" key={step.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h3" sx={{ fontSize: '1.05rem' }}>
                    {step.title}
                  </Typography>
                  <Button size="small" onClick={() => handleEdit(step.id)}>
                    Edit
                  </Button>
                </Box>
                <Box sx={{ border: `1px solid ${uswds.baseLighter}`, borderRadius: 1 }}>
                  {step.fields
                    .filter((field) => visibleFields.has(field.name))
                    .map((field, i, arr) => (
                      <Box
                        key={field.name}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 2,
                          px: 2,
                          py: 1.25,
                          borderBottom: i < arr.length - 1 ? `1px solid ${uswds.baseLighter}` : 'none',
                        }}
                      >
                        <Typography variant="body2" sx={{ color: uswds.ink }}>
                          {field.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>
                          {formatAnswer(field, answers[field.name])}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
            ))}
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: `1px solid ${uswds.baseLighter}`, pt: 3, mt: 4 }}>
          <Button variant="contained" onClick={() => navigate(`/apply/${applicationId}/download`)}>
            Continue to Generate PDF
          </Button>
        </Box>
      </Paper>
    </Layout>
  );
}
