import { useEffect, useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@mui/material';
import type { StepSchema, FormManifest } from '../../engine/schema/types';
import type { RuleDocument } from '../../engine/rules/types';
import type { RuleEvaluationResult } from '../../engine/rules/rulesEngine';
import type { WizardContext, WizardEvent } from '../../engine/machine/buildWizardMachine';
import { findNextVisibleStepId, findPreviousVisibleStepId } from '../../engine/machine/stepNavigation';
import { buildStepZodSchema } from '../../engine/schema/buildZodSchema';
import { evaluateRules, useRuleEvaluation } from '../../engine/rules/rulesEngine';
import { SchemaField } from '../../components/fields/SchemaField';
import { InfoCallout } from '../../components/layout/InfoCallout';
import { StepContent } from '../../components/layout/StepContent';
import { WizardNav } from './WizardNav';

interface WizardStepViewProps {
  step: StepSchema;
  manifest: FormManifest;
  rules: RuleDocument;
  context: WizardContext;
  isFirstStep: boolean;
  onBackToDashboard: () => void;
  send: (event: WizardEvent) => void;
  /** Lets the sidebar (a render sibling, not a descendant of this form) trigger this step's commit-and-navigate — see WizardPage.tsx. */
  registerNavigate: (fn: (stepId: string) => void) => void;
}

function defaultValueFor(field: StepSchema['fields'][number], existing: unknown) {
  if (existing !== undefined) return existing;
  return field.type === 'checkbox' ? false : '';
}

export function WizardStepView({ step, manifest, rules, context, isFirstStep, onBackToDashboard, send, registerNavigate }: WizardStepViewProps) {
  const zodSchema = useMemo(() => buildStepZodSchema(step), [step]);
  const defaultValues = useMemo(
    () => Object.fromEntries(step.fields.map((f) => [f.name, defaultValueFor(f, context.answers[f.name])])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step],
  );

  const methods = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
    // Validate as the user tabs through fields, purely for inline format feedback
    // (e.g. a malformed SSN) — never a gate on leaving the step, see commitAndGo below.
    mode: 'onBlur',
  });

  // Recomputed every render (cheap: two small object spreads); useRuleEvaluation only
  // re-runs the actual rules engine when JSON.stringify(liveFacts) changes.
  const liveFacts = { ...context.answers, ...methods.watch() };
  const liveRules = useRuleEvaluation(rules, manifest, liveFacts);

  /**
   * The one path every way of leaving this step goes through: grab whatever
   * is currently in the form (valid or not), merge it into the accumulated
   * answers, recompute rule-driven visibility against that merged set, and
   * hand the machine an explicit target — resolved from the fresh
   * ruleResult, since a value just entered here can make a step later in
   * manifest order newly visible (or hide one). Deliberately not gated on
   * Zod validity: this app defers "did you fill in every mandatory field" to
   * Review/Download, not to leaving a step (see buildWizardMachine.ts).
   */
  async function commitAndGo(resolveTarget: (ruleResult: RuleEvaluationResult) => string) {
    const values = methods.getValues();
    const mergedAnswers = { ...context.answers, ...values };
    const ruleResult = await evaluateRules(rules, manifest, mergedAnswers);
    send({ type: 'NAVIGATE', stepId: resolveTarget(ruleResult), values, ruleResult });
  }

  const goToStep = (stepId: string) => commitAndGo(() => stepId);

  // No dependency array: keeps the sidebar's ref pointed at *this* render's
  // closure (fresh `context`/`methods`) after every render, not just on mount.
  useEffect(() => {
    registerNavigate(goToStep);
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    commitAndGo((ruleResult) => findNextVisibleStepId(manifest.steps, step.id, ruleResult.visibleSteps));
  }

  async function handleBack() {
    if (isFirstStep) {
      await commitAndGo(() => step.id); // persist any in-progress edits before leaving the wizard
      onBackToDashboard();
      return;
    }
    await commitAndGo((ruleResult) => findPreviousVisibleStepId(manifest.steps, step.id, ruleResult.visibleSteps));
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} noValidate>
        <Typography variant="h2" sx={{ mb: step.description ? 2 : 3 }}>
          {step.title}
        </Typography>
        {step.description && <InfoCallout>{step.description}</InfoCallout>}
        {step.content && <StepContent blocks={step.content} />}

        {step.fields.map((field) => (
          <SchemaField
            key={field.name}
            field={field}
            visible={liveRules.visibleFields.has(field.name)}
            required={Boolean(field.constraints?.required) || liveRules.requiredFields.has(field.name)}
          />
        ))}

        <WizardNav isFirstStep={isFirstStep} onBack={handleBack} />
      </form>
    </FormProvider>
  );
}
