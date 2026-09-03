import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useActorRef, useSelector } from '@xstate/react';
import { Box, Paper, Typography } from '@mui/material';
import { getForm } from '../../engine/registry/formRegistry';
import { buildWizardMachine } from '../../engine/machine/buildWizardMachine';
import { loadSnapshot, persistActorOnChange, saveSnapshot } from '../../engine/persistence/wizardPersistence';
import { getApplication, updateApplication } from '../../engine/persistence/applicationsRegistry';
import { Layout } from '../../components/ui/Layout';
import { uswds } from '../../theme';
import { SidebarNav } from './SidebarNav';
import { WizardStepView } from './WizardStepView';

interface WizardPageInnerProps {
  applicationId: string;
  stepIdFromUrl: string;
  formId: string;
}

function WizardPageInner({ applicationId, stepIdFromUrl, formId }: WizardPageInnerProps) {
  const navigate = useNavigate();
  const { manifest, rules, evidenceCatalog } = getForm(formId);
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
      // A form with no evidence catalog items collects its evidence entirely as real,
      // sidebar-integrated wizard steps (see e.g. src/forms/i-130/steps/35-*.ts) — routing
      // it through the generic checklist screen anyway would just re-show the same items a
      // second time with no real upload mechanism of its own. Only forms whose evidence
      // still lives in a catalog (e.g. I-485) go through that screen.
      updateApplication(applicationId, { status: 'evidence_review' });
      navigate(evidenceCatalog.items.length > 0 ? `/apply/${applicationId}/evidence` : `/apply/${applicationId}/review`, { replace: true });
      return;
    }
    if (currentStepId !== stepIdFromUrl) {
      updateApplication(applicationId, { status: 'in_progress', currentStepId });
      navigate(`/apply/${applicationId}/wizard/${currentStepId}`, { replace: true });
    }
  }, [currentStepId, stepIdFromUrl, applicationId, navigate, actorRef]);

  const step = manifest.steps.find((s) => s.id === currentStepId);

  // The sidebar lives outside WizardStepView's <form> (a render sibling, not a descendant),
  // but a jump still needs to commit that form's in-progress values first — this ref is how
  // WizardStepView hands WizardPage a fresh "commit and go there" closure every render.
  const navigateRef = useRef<(stepId: string) => void>(() => {});

  // context.visibleSteps only updates once a step is actually committed (Next/Back/a sidebar
  // jump) — so on its own, answering "Yes" here wouldn't unlock the next step in the sidebar
  // until you left the page. This tracks the *current* step's live, not-yet-committed rule
  // evaluation instead, so the sidebar reacts the instant a field changes. Unioned with
  // context.visibleSteps below (never subtracted from) so a step already unlocked by an
  // earlier commit can't flicker back to locked while this step's own live result briefly
  // resets on remount (see WizardStepView's useRuleEvaluation).
  const [liveVisibleSteps, setLiveVisibleSteps] = useState<Set<string>>(() => new Set());
  const sidebarVisibleSteps = useMemo(
    () => new Set([...snapshot.context.visibleSteps, ...liveVisibleSteps]),
    [snapshot.context.visibleSteps, liveVisibleSteps],
  );

  if (!step) return null; // mid-navigation to /evidence, or a not-yet-rendered redirect above

  return (
    <Layout fullBleed>
      <Box sx={{ display: 'flex', minHeight: '100%', justifyContent: 'center' }}>
        <Box
          sx={{
            width: 280,
            flexShrink: 0,
            bgcolor: uswds.baseLightest,
            py: 3
          }}
        >
          <Typography sx={{ px: 2, mb: 2, pb: 2, fontSize: '1.25rem', fontWeight: 700, color: uswds.inkDarkest, borderBottom: `1px solid ${uswds.baseLighter}` }}>
            {manifest.shortTitle}
          </Typography>
          <SidebarNav
            steps={manifest.steps}
            currentStepId={currentStepId}
            visibleSteps={sidebarVisibleSteps}
            onNavigate={(stepId) => navigateRef.current(stepId)}
          />
        </Box>

        <Box sx={{ flex: 1, p: { xs: 3, sm: 5 }, maxWidth: 720 }}>
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
            registerNavigate={(fn) => {
              navigateRef.current = fn;
            }}
            onLiveRulesChange={(result) => setLiveVisibleSteps(result.visibleSteps)}
          />
        </Box>
      </Box>
    </Layout>
  );
}

export function WizardPage() {
  const { applicationId = '', stepId = '' } = useParams();
  const application = getApplication(applicationId);

  if (!application) {
    return (
      <Layout>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Typography>We couldn&apos;t find that application. It may have been removed.</Typography>
        </Paper>
      </Layout>
    );
  }

  return <WizardPageInner applicationId={applicationId} stepIdFromUrl={stepId} formId={application.formId} />;
}
