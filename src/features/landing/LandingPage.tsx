import { useNavigate } from 'react-router-dom';
import { listForms, getForm } from '../../engine/registry/formRegistry';
import { createApplication } from '../../engine/persistence/applicationsRegistry';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function LandingPage() {
  const navigate = useNavigate();
  const forms = listForms();

  function handleStart(formId: string) {
    const { manifest } = getForm(formId);
    const application = createApplication(formId, manifest.shortTitle);
    navigate(`/apply/${application.id}/wizard/${manifest.steps[0].id}`);
  }

  return (
    <Layout>
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold text-slate-900">Guided Filing, Without the Guesswork</h1>
        <p className="mx-auto max-w-xl text-slate-600">
          Answer a few questions at a time. We track what evidence you'll need and generate your filled, ready-to-review
          PDF at the end — like tracking an order, not wrangling a government form.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {forms.map((manifest) => (
          <Card key={manifest.id}>
            <h2 className="mb-1 text-lg font-semibold text-slate-900">{manifest.shortTitle}</h2>
            {manifest.description && <p className="mb-4 text-sm text-slate-600">{manifest.description}</p>}
            <Button onClick={() => handleStart(manifest.id)}>Start my application</Button>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
