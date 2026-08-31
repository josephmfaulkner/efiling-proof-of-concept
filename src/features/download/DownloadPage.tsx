import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Box, Button, List, ListItem, ListItemText, Paper, Stack, Typography } from '@mui/material';
import { getApplication, updateApplication } from '../../engine/persistence/applicationsRegistry';
import { getForm } from '../../engine/registry/formRegistry';
import { loadSnapshot, extractContext } from '../../engine/persistence/wizardPersistence';
import { fillPdfTemplate } from '../../engine/pdf/fillPdf';
import { useRuleEvaluation } from '../../engine/rules/rulesEngine';
import { findMissingRequiredFields } from '../../engine/validation/validateAnswers';
import { Layout } from '../../components/ui/Layout';
import { uswds } from '../../theme';

export function DownloadPage() {
  const { applicationId = '' } = useParams();
  const navigate = useNavigate();
  const application = getApplication(applicationId);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!application) {
    return (
      <Layout>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Typography>We couldn&apos;t find that application.</Typography>
        </Paper>
      </Layout>
    );
  }

  const { manifest, pdfMapping, rules } = getForm(application.formId);
  const context = extractContext(loadSnapshot(applicationId));
  const answers = context?.answers ?? {};

  // Same fresh-evaluation check as Review — the hard gate this app promises: free
  // navigation everywhere else, but a filled PDF is never generated from an incomplete set
  // of mandatory answers.
  const ruleResult = useRuleEvaluation(rules, manifest, answers);
  const missing = findMissingRequiredFields(manifest, answers, ruleResult);

  async function handleGenerate() {
    setIsGenerating(true);
    setErrorMessage(null);
    try {
      const blob = await fillPdfTemplate(manifest.pdfTemplatePath, pdfMapping, answers);
      const url = URL.createObjectURL(blob);
      setPdfUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });
      updateApplication(applicationId, { status: 'ready_to_download' });
    } catch (err) {
      console.error(err);
      setErrorMessage('Something went wrong generating the PDF. Check the browser console for details.');
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Layout>
      <Paper variant="outlined" sx={{ p: { xs: 3, sm: 5 } }}>
        <Typography variant="h2" sx={{ mb: 1 }}>
          Generate Your Filled {manifest.shortTitle}
        </Typography>
        <Typography sx={{ mb: 3, color: 'text.secondary' }}>
          This fills the real PDF template entirely in your browser using pdf-lib — nothing is
          sent to a server.
        </Typography>

        {missing.length > 0 ? (
          <Alert severity="error" sx={{ mb: 3, bgcolor: uswds.errorLighter, border: `1px solid ${uswds.error}` }}>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>
              You must complete {missing.length} more required {missing.length === 1 ? 'field' : 'fields'} before you can
              generate your PDF.
            </Typography>
            <List dense disablePadding sx={{ mb: 1 }}>
              {missing.slice(0, 12).map((m) => (
                <ListItem key={`${m.step.id}.${m.field.name}`} disablePadding sx={{ display: 'list-item', listStyleType: 'disc', ml: 3 }}>
                  <ListItemText primary={`${m.step.title} — ${m.field.label}`} slotProps={{ primary: { variant: 'body2' } }} />
                </ListItem>
              ))}
            </List>
            {missing.length > 12 && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                …and {missing.length - 12} more.
              </Typography>
            )}
            <Button variant="contained" onClick={() => navigate(`/apply/${applicationId}/review`)}>
              Go to Review
            </Button>
          </Alert>
        ) : (
          !pdfUrl && (
            <Button variant="contained" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? 'Generating…' : 'Generate PDF'}
            </Button>
          )
        )}

        {errorMessage && (
          <Typography variant="body2" sx={{ mt: 2, color: 'error.main' }}>
            {errorMessage}
          </Typography>
        )}

        {pdfUrl && (
          <Box sx={{ mt: 3 }}>
            <Box
              component="embed"
              src={pdfUrl}
              type="application/pdf"
              sx={{ height: 600, width: '100%', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button
                component="a"
                href={pdfUrl}
                download={`${application.formId}-filled.pdf`}
                onClick={() => updateApplication(applicationId, { status: 'downloaded' })}
                variant="contained"
              >
                Download PDF
              </Button>
              <Button variant="outlined" onClick={handleGenerate} disabled={isGenerating}>
                Regenerate
              </Button>
            </Stack>
          </Box>
        )}
      </Paper>
    </Layout>
  );
}
