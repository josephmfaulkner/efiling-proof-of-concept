import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplication, updateApplication } from '../../engine/persistence/applicationsRegistry';
import { getForm } from '../../engine/registry/formRegistry';
import { loadSnapshot, extractContext } from '../../engine/persistence/wizardPersistence';
import { fillPdfTemplate } from '../../engine/pdf/fillPdf';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function DownloadPage() {
  const { applicationId = '' } = useParams();
  const application = getApplication(applicationId);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!application) {
    return (
      <Layout>
        <Card>
          <p className="text-slate-700">We couldn't find that application.</p>
        </Card>
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
      <Card>
        <h1 className="mb-1 text-2xl font-semibold text-slate-900">Generate Your Filled I-485</h1>
        <p className="mb-6 text-slate-600">
          This fills the real Form I-485 PDF template entirely in your browser using pdf-lib — nothing is sent to a
          server.
        </p>

        {!pdfUrl && (
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? 'Generating…' : 'Generate PDF'}
          </Button>
        )}

        {errorMessage && <p className="mt-4 text-sm text-red-600">{errorMessage}</p>}

        {pdfUrl && (
          <div className="mt-4">
            <embed src={pdfUrl} type="application/pdf" className="h-[600px] w-full rounded-md border border-slate-200" />
            <div className="mt-4 flex gap-3">
              <a
                href={pdfUrl}
                download={`${application.formId}-filled.pdf`}
                onClick={() => updateApplication(applicationId, { status: 'downloaded' })}
                className="rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800"
              >
                Download PDF
              </a>
              <Button variant="secondary" onClick={handleGenerate} disabled={isGenerating}>
                Regenerate
              </Button>
            </div>
          </div>
        )}
      </Card>
    </Layout>
  );
}
