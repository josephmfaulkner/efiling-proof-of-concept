import type { StepSchema } from '../schema/types';

/**
 * "Next"/"Back" are sequential conveniences layered on top of otherwise-free
 * navigation (see buildWizardMachine.ts) — they walk manifest.steps order
 * from the current step and skip anything the rules engine hasn't made
 * visible yet, same skip behavior the machine used to bake into per-state
 * transition lists. The sidebar's arbitrary jumps don't use these at all;
 * they send an explicit target stepId straight through.
 */

export function findNextVisibleStepId(steps: StepSchema[], fromStepId: string, visibleSteps: Set<string>): string {
  const fromIndex = steps.findIndex((s) => s.id === fromStepId);
  for (let i = fromIndex + 1; i < steps.length; i++) {
    if (visibleSteps.has(steps[i].id)) return steps[i].id;
  }
  return 'complete';
}

export function findPreviousVisibleStepId(steps: StepSchema[], fromStepId: string, visibleSteps: Set<string>): string {
  const fromIndex = steps.findIndex((s) => s.id === fromStepId);
  for (let i = fromIndex - 1; i >= 0; i--) {
    if (visibleSteps.has(steps[i].id)) return steps[i].id;
  }
  return steps[0].id;
}
