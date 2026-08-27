import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplication, updateApplication } from '../../engine/persistence/applicationsRegistry';
import { getForm } from '../../engine/registry/formRegistry';
import { loadSnapshot, extractContext } from '../../engine/persistence/wizardPersistence';
import type { EvidenceItem } from '../../engine/evidence/types';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

function EvidenceRow({ item }: { item: EvidenceItem }) {
  const [attached, setAttached] = useState<File | null>(null);

  return (
    <li className="rounded-md border border-slate-200 p-4">
      <p className="font-medium text-slate-900">{item.title}</p>
      {item.description && <p className="mt-1 text-sm text-slate-500">{item.description}</p>}
      <div className="mt-3">
        <input
          type="file"
          className="block text-sm text-slate-700 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
          onChange={(e) => setAttached(e.target.files?.[0] ?? null)}
        />
        {attached && (
          <p className="mt-1 text-sm text-slate-600">
            Attached: {attached.name} ({Math.round(attached.size / 1024)} KB) — demo only, nothing is actually uploaded.
          </p>
        )}
      </div>
    </li>
  );
}

export function EvidenceChecklistPage() {
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

  const { evidenceCatalog } = getForm(application.formId);
  const context = extractContext(loadSnapshot(applicationId));
  const activeEvidence = context?.activeEvidence ?? new Set<string>();

  const alwaysItems = evidenceCatalog.items.filter((item) => item.alwaysRequired);
  const conditionalItems = evidenceCatalog.items.filter((item) => !item.alwaysRequired && activeEvidence.has(item.key));

  function handleContinue() {
    updateApplication(applicationId, { status: 'ready_to_download' });
    navigate(`/apply/${applicationId}/review`);
  }

  return (
    <Layout>
      <Card>
        <h1 className="mb-1 text-2xl font-semibold text-slate-900">Evidence Checklist</h1>
        <p className="mb-6 text-slate-600">
          Based on your answers, here's what you'll likely need to submit. This list is illustrative only — it is not a
          complete or legally vetted checklist for your specific case.
        </p>

        <h2 className="mb-2 text-sm font-semibold tracking-wide text-slate-500 uppercase">Always required</h2>
        <ul className="mb-6 space-y-3">
          {alwaysItems.map((item) => (
            <EvidenceRow key={item.key} item={item} />
          ))}
        </ul>

        {conditionalItems.length > 0 && (
          <>
            <h2 className="mb-2 text-sm font-semibold tracking-wide text-slate-500 uppercase">Based on your answers</h2>
            <ul className="mb-6 space-y-3">
              {conditionalItems.map((item) => (
                <EvidenceRow key={item.key} item={item} />
              ))}
            </ul>
          </>
        )}

        <div className="mt-8 flex justify-end border-t border-slate-200 pt-6">
          <Button onClick={handleContinue}>Continue to Review</Button>
        </div>
      </Card>
    </Layout>
  );
}
