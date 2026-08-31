import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { getApplication } from '../../engine/persistence/applicationsRegistry';
import { getForm } from '../../engine/registry/formRegistry';
import { loadSnapshot, extractContext, jumpToStep } from '../../engine/persistence/wizardPersistence';
import { useRuleEvaluation } from '../../engine/rules/rulesEngine';
import { findMissingRequiredFields } from '../../engine/validation/validateAnswers';
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

  const { manifest, rules } = getForm(application.formId);
  const context = extractContext(loadSnapshot(applicationId));
  const answers = context?.answers ?? {};

  // Recomputed fresh here rather than trusted from the persisted snapshot — this is the
  // one place "is everything mandatory filled in" gets decided, so it always runs over the
  // full accumulated answers rather than whatever visibility happened to be current as of
  // the last step submitted.
  const ruleResult = useRuleEvaluation(rules, manifest, answers);
  const missing = findMissingRequiredFields(manifest, answers, ruleResult);
  const missingByStepId = new Map<string, number>();
  for (const m of missing) missingByStepId.set(m.step.id, (missingByStepId.get(m.step.id) ?? 0) + 1);

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

        {missing.length > 0 && (
          <Alert severity="error" sx={{ mb: 3, bgcolor: uswds.errorLighter, border: `1px solid ${uswds.error}` }}>
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
              You have {missing.length} incomplete required {missing.length === 1 ? 'field' : 'fields'}.
            </Typography>
            <Typography variant="body2">
              A red alert means a required response is missing. You cannot generate your PDF until every section below is
              complete — select Edit on a flagged section to fix it.
            </Typography>
          </Alert>
        )}

        <Stack spacing={4}>
          {manifest.steps
            .filter((step) => ruleResult.visibleSteps.has(step.id))
            .map((step) => {
              const missingCount = missingByStepId.get(step.id) ?? 0;
              return (
                <Box component="section" key={step.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h3" sx={{ fontSize: '1.05rem' }}>
                      {step.title}
                    </Typography>
                    <Button size="small" onClick={() => handleEdit(step.id)}>
                      Edit
                    </Button>
                  </Box>
                  {missingCount > 0 && (
                    <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 600, mb: 1 }}>
                      There {missingCount === 1 ? 'is' : 'are'} {missingCount} error{missingCount === 1 ? '' : 's'} in{' '}
                      {step.section ? `${step.section}: ` : ''}
                      {step.title}
                    </Typography>
                  )}
                  <Box sx={{ border: `1px solid ${uswds.baseLighter}`, borderRadius: 1 }}>
                    {step.fields
                      .filter((field) => ruleResult.visibleFields.has(field.name))
                      .map((field, i, arr) => {
                        const isMissing = missing.some((m) => m.step.id === step.id && m.field.name === field.name);
                        return (
                          <Box
                            key={field.name}
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: 2,
                              px: 2,
                              py: 1.25,
                              borderBottom: i < arr.length - 1 ? `1px solid ${uswds.baseLighter}` : 'none',
                              bgcolor: isMissing ? uswds.errorLighter : undefined,
                            }}
                          >
                            <Typography variant="body2" sx={{ color: uswds.ink }}>
                              {field.label}
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right', color: isMissing ? 'error.main' : undefined }}>
                              {isMissing ? 'Required — missing' : formatAnswer(field, answers[field.name])}
                            </Typography>
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              );
            })}
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
