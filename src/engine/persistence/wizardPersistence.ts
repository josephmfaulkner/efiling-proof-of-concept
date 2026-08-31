import type { ActorRefFrom } from 'xstate';
import type { WizardContext, WizardMachine } from '../machine/buildWizardMachine';

const PREFIX = 'uscis-poc:wizard:';

/**
 * This app's XState context nests `Set` objects (visibleSteps, visibleFields,
 * requiredFields, activeEvidence). Verified by hand-testing XState v5 directly:
 * plain JSON.stringify/JSON.parse silently collapses a Set to `{}` with no
 * error — and a guard calling `.has()` on that revived `{}` throws at
 * runtime. This replacer/reviver pair round-trips Sets explicitly so a page
 * refresh mid-wizard doesn't quietly corrupt conditional-visibility state.
 */
function replacer(_key: string, value: unknown) {
  if (value instanceof Set) return { __set: true, values: [...value] };
  return value;
}

interface SerializedSet {
  __set: true;
  values: unknown[];
}

function isSerializedSet(value: unknown): value is SerializedSet {
  return typeof value === 'object' && value !== null && (value as Record<string, unknown>).__set === true;
}

function reviver(_key: string, value: unknown) {
  return isSerializedSet(value) ? new Set(value.values) : value;
}

export function saveSnapshot(applicationId: string, snapshot: unknown) {
  localStorage.setItem(`${PREFIX}${applicationId}`, JSON.stringify(snapshot, replacer));
}

export function loadSnapshot(applicationId: string): unknown | undefined {
  const raw = localStorage.getItem(`${PREFIX}${applicationId}`);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw, reviver);
  } catch {
    return undefined;
  }
}

export function clearSnapshot(applicationId: string) {
  localStorage.removeItem(`${PREFIX}${applicationId}`);
}

/**
 * Evidence/Review/Download are plain routes, not machine states (see
 * buildWizardMachine.ts) — they read a completed wizard's answers straight
 * out of the persisted snapshot instead of keeping the actor mounted.
 */
export function extractContext(snapshot: unknown): WizardContext | undefined {
  if (!snapshot || typeof snapshot !== 'object') return undefined;
  return (snapshot as { context?: WizardContext }).context;
}

/**
 * Review's "Edit" links need to move a *completed* wizard back to an earlier
 * step, but no actor is mounted outside the wizard route to `.send()` a
 * NAVIGATE to. Rather than keep one alive across routes, this rewrites the
 * persisted snapshot's `value` directly — XState resumes an actor from
 * whatever `value`/`context` a snapshot holds, so this is equivalent to
 * having navigated there before the page was ever left.
 */
export function jumpToStep(applicationId: string, stepId: string) {
  const raw = loadSnapshot(applicationId);
  if (!raw || typeof raw !== 'object') return;
  saveSnapshot(applicationId, { ...raw, value: stepId });
}

/** Subscribes to an actor and debounce-saves its snapshot; returns an unsubscribe function. */
export function persistActorOnChange(
  applicationId: string,
  actorRef: ActorRefFrom<WizardMachine>,
  debounceMs = 500,
): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const subscription = actorRef.subscribe(() => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      saveSnapshot(applicationId, actorRef.getPersistedSnapshot());
    }, debounceMs);
  });
  return () => {
    if (timer) clearTimeout(timer);
    // Flush synchronously on unmount rather than just cancelling the pending debounce.
    // Verified by hand: WizardPage navigates away as soon as the machine reaches
    // 'complete' (see WizardPage.tsx), which unmounts this effect within the same
    // debounce window — cancelling without flushing silently dropped the final
    // transition (e.g. a just-computed activeEvidence set never reaching
    // localStorage, so the Evidence Checklist read stale, pre-submission data).
    saveSnapshot(applicationId, actorRef.getPersistedSnapshot());
    subscription.unsubscribe();
  };
}
