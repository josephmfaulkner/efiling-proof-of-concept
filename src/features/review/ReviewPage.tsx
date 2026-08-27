import { useNavigate, useParams } from 'react-router-dom';
import { getApplication } from '../../engine/persistence/applicationsRegistry';
import { getForm } from '../../engine/registry/formRegistry';
import { loadSnapshot, extractContext, jumpToStep } from '../../engine/persistence/wizardPersistence';
import type { FieldSchema } from '../../engine/schema/types';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

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
        <Card>
          <p className="text-slate-700">We couldn't find that application.</p>
        </Card>
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
      <Card>
        <h1 className="mb-1 text-2xl font-semibold text-slate-900">Review Your Answers</h1>
        <p className="mb-6 text-slate-600">Check everything below before generating your PDF.</p>

        <div className="space-y-8">
          {manifest.steps
            .filter((step) => visibleSteps.has(step.id))
            .map((step) => (
              <section key={step.id}>
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="font-semibold text-slate-900">{step.title}</h2>
                  <button
                    type="button"
                    onClick={() => handleEdit(step.id)}
                    className="text-sm font-medium text-blue-700 hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <dl className="divide-y divide-slate-100 rounded-md border border-slate-200">
                  {step.fields
                    .filter((field) => visibleFields.has(field.name))
                    .map((field) => (
                      <div key={field.name} className="flex justify-between gap-4 px-4 py-2 text-sm">
                        <dt className="text-slate-500">{field.label}</dt>
                        <dd className="text-right text-slate-900">{formatAnswer(field, answers[field.name])}</dd>
                      </div>
                    ))}
                </dl>
              </section>
            ))}
        </div>

        <div className="mt-8 flex justify-end border-t border-slate-200 pt-6">
          <Button onClick={() => navigate(`/apply/${applicationId}/download`)}>Continue to Generate PDF</Button>
        </div>
      </Card>
    </Layout>
  );
}
