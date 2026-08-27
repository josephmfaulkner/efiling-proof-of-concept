import { useMemo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { StepSchema, FormManifest } from '../../engine/schema/types';
import type { RuleDocument } from '../../engine/rules/types';
import type { WizardContext, WizardEvent } from '../../engine/machine/buildWizardMachine';
import { buildStepZodSchema } from '../../engine/schema/buildZodSchema';
import { evaluateRules, useRuleEvaluation } from '../../engine/rules/rulesEngine';
import { SchemaField } from '../../components/fields/SchemaField';
import { WizardNav } from './WizardNav';

interface WizardStepViewProps {
  step: StepSchema;
  manifest: FormManifest;
  rules: RuleDocument;
  context: WizardContext;
  isFirstStep: boolean;
  onBackToDashboard: () => void;
  send: (event: WizardEvent) => void;
}

function defaultValueFor(field: StepSchema['fields'][number], existing: unknown) {
  if (existing !== undefined) return existing;
  return field.type === 'checkbox' ? false : '';
}

export function WizardStepView({ step, manifest, rules, context, isFirstStep, onBackToDashboard, send }: WizardStepViewProps) {
  const zodSchema = useMemo(() => buildStepZodSchema(step), [step]);
  const defaultValues = useMemo(
    () => Object.fromEntries(step.fields.map((f) => [f.name, defaultValueFor(f, context.answers[f.name])])),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step],
  );

  const methods = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  // Recomputed every render (cheap: two small object spreads); useRuleEvaluation only
  // re-runs the actual rules engine when JSON.stringify(liveFacts) changes.
  const liveFacts = { ...context.answers, ...methods.watch() };
  const liveRules = useRuleEvaluation(rules, manifest, liveFacts);

  async function onValid(values: Record<string, unknown>) {
    const mergedAnswers = { ...context.answers, ...values };
    const ruleResult = await evaluateRules(rules, manifest, mergedAnswers);

    // Conditional requiredness (rules-engine `requireField` events) isn't in the static
    // Zod schema by design (see buildZodSchema.ts) — enforced here as a second pass so a
    // rule flipping a field's requiredness never forces rebuilding the resolver.
    let blocked = false;
    for (const fieldName of ruleResult.requiredFields) {
      const belongsToThisStep = step.fields.some((f) => f.name === fieldName);
      if (!belongsToThisStep) continue;
      const value = values[fieldName];
      if (value === undefined || value === '' || value === false) {
        methods.setError(fieldName, { message: 'This is required based on your other answers.' });
        blocked = true;
      }
    }
    if (blocked) return;

    send({ type: 'SUBMIT_STEP', stepId: step.id, values, ruleResult });
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onValid)} noValidate>
        <h1 className="mb-1 text-2xl font-semibold text-slate-900">{step.title}</h1>
        {step.description && <p className="mb-6 text-slate-600">{step.description}</p>}

        {step.fields.map((field) => (
          <SchemaField
            key={field.name}
            field={field}
            visible={liveRules.visibleFields.has(field.name)}
            required={Boolean(field.constraints?.required) || liveRules.requiredFields.has(field.name)}
          />
        ))}

        <WizardNav
          isFirstStep={isFirstStep}
          onBack={() => (isFirstStep ? onBackToDashboard() : send({ type: 'BACK' }))}
        />
      </form>
    </FormProvider>
  );
}
