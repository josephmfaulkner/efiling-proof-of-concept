import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { getApplication, updateApplication } from '../../engine/persistence/applicationsRegistry';
import { getForm } from '../../engine/registry/formRegistry';
import { loadSnapshot, extractContext } from '../../engine/persistence/wizardPersistence';
import { fillPdfTemplate } from '../../engine/pdf/fillPdf';
import { Layout } from '../../components/ui/Layout';

export function DownloadPage() {
  const { applicationId = '' } = useParams();
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

  const { manifest, pdfMapping } = getForm(application.formId);
  const context = extractContext(loadSnapshot(applicationId));
  const answers = context?.answers ?? {};

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

        {!pdfUrl && (
          <Button variant="contained" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating…' : 'Generate PDF'}
          </Button>
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
