import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useActorRef, useSelector } from '@xstate/react';
import { getForm } from '../../engine/registry/formRegistry';
import { buildWizardMachine } from '../../engine/machine/buildWizardMachine';
import { loadSnapshot, persistActorOnChange, saveSnapshot } from '../../engine/persistence/wizardPersistence';
import { getApplication, updateApplication } from '../../engine/persistence/applicationsRegistry';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Card';
import { Stepper } from '../../components/ui/Stepper';
import { WizardStepView } from './WizardStepView';

interface WizardPageInnerProps {
  applicationId: string;
  stepIdFromUrl: string;
  formId: string;
}

function WizardPageInner({ applicationId, stepIdFromUrl, formId }: WizardPageInnerProps) {
  const navigate = useNavigate();
  const { manifest, rules } = getForm(formId);
  const machine = useMemo(() => buildWizardMachine(manifest), [manifest]);
  const restoredSnapshot = useMemo(() => loadSnapshot(applicationId), [applicationId]);

  const actorRef = useActorRef(
    machine,
    // Persisted JSON has no compile-time-verified shape — this is the one deserialization
    // boundary in the app where that's unavoidable without a runtime schema validator.
    restoredSnapshot ? ({ snapshot: restoredSnapshot } as any) : undefined,
  );

  useEffect(() => persistActorOnChange(applicationId, actorRef), [applicationId, actorRef]);

  const snapshot = useSelector(actorRef, (s) => s);
  const currentStepId = String(snapshot.value);
  const firstStepId = manifest.steps[0].id;

  useEffect(() => {
    if (currentStepId === 'complete') {
      // Flush synchronously before navigating: EvidenceChecklistPage reads localStorage
      // during its own render, which the React Router transition runs *before* this
      // component's unmount cleanup (persistActorOnChange's debounced/flush-on-unmount
      // save) ever fires. Relying on that cleanup alone left the Evidence page reading a
      // stale snapshot — verified by hand: localStorage held the correct activeEvidence
      // moments later, but the already-rendered page never re-read it.
      saveSnapshot(applicationId, actorRef.getPersistedSnapshot());
      updateApplication(applicationId, { status: 'evidence_review' });
      navigate(`/apply/${applicationId}/evidence`, { replace: true });
      return;
    }
    if (currentStepId !== stepIdFromUrl) {
      updateApplication(applicationId, { status: 'in_progress', currentStepId });
      navigate(`/apply/${applicationId}/wizard/${currentStepId}`, { replace: true });
    }
  }, [currentStepId, stepIdFromUrl, applicationId, navigate, actorRef]);

  const step = manifest.steps.find((s) => s.id === currentStepId);
  if (!step) return null; // mid-navigation to /evidence, or a not-yet-rendered redirect above

  return (
    <Layout>
      <Card>
        <Stepper steps={manifest.steps} currentStepId={currentStepId} />
        <WizardStepView
          // Forces a fresh mount (fresh useForm()) per step. Without this, revisiting a
          // step within the same WizardPage session (Back, or continuing forward again
          // after a Review "Edit") reused the *first* step's useForm instance — RHF only
          // applies `defaultValues` at that instance's initial mount, so every later step
          // rendered with blank/stale field state instead of its real context.answers.
          key={step.id}
          step={step}
          manifest={manifest}
          rules={rules}
          context={snapshot.context}
          isFirstStep={currentStepId === firstStepId}
          onBackToDashboard={() => navigate('/dashboard')}
          send={(event) => actorRef.send(event)}
        />
      </Card>
    </Layout>
  );
}

export function WizardPage() {
  const { applicationId = '', stepId = '' } = useParams();
  const application = getApplication(applicationId);

  if (!application) {
    return (
      <Layout>
        <Card>
          <p className="text-slate-700">We couldn't find that application. It may have been removed.</p>
        </Card>
      </Layout>
    );
  }

  return <WizardPageInner applicationId={applicationId} stepIdFromUrl={stepId} formId={application.formId} />;
}
