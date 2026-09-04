import { z } from 'zod';
import type { FieldSchema, StepSchema } from './types';

const DEFAULT_PATTERNS: Partial<Record<FieldSchema['type'], RegExp>> = {
  ssn: /^\d{3}-?\d{2}-?\d{4}$/,
  aNumber: /^A?-?\d{7,9}$/,
  date: /^\d{4}-\d{2}-\d{2}$/,
  integer: /^\d+$/,
};

const DEFAULT_MESSAGES: Partial<Record<FieldSchema['type'], string>> = {
  ssn: 'Enter a 9-digit Social Security Number',
  aNumber: 'Enter a 7-9 digit A-Number',
  date: 'Enter a valid date',
  integer: 'Enter a non-negative whole number',
};

/**
 * Builds one field's Zod type from its declarative schema. Only the
 * *statically* required/format constraints live here — rules-engine-driven
 * conditional requiredness is enforced separately at submit time (see
 * WizardStepView), so a rule toggling a field's requiredness never forces
 * rebuilding this schema or remounting RHF's resolver.
 */
export function buildFieldZodType(field: FieldSchema): z.ZodTypeAny {
  const required = field.constraints?.required ?? false;

  switch (field.type) {
    case 'checkbox': {
      const bool = z.boolean();
      return required ? bool.refine((v) => v === true, { message: `${field.label} is required` }) : bool;
    }
    case 'file': {
      return required
        ? z.instanceof(File, { message: `${field.label} is required` })
        : z.instanceof(File).optional();
    }
    case 'integer': {
      // The `^\d+$` pattern alone already rules out a minus sign or a decimal
      // point — "non-negative whole number" is guaranteed by the format check,
      // not a separate rule. min/max (e.g. a weight of 30-699 lbs) are just
      // tighter, field-specific bounds on top of that.
      const c = field.constraints;
      const pattern = c?.pattern ? new RegExp(c.pattern) : DEFAULT_PATTERNS.integer!;
      let numStr: z.ZodTypeAny = z.string().regex(pattern, c?.patternMessage ?? DEFAULT_MESSAGES.integer!);
      if (c?.min !== undefined) {
        const min = c.min;
        numStr = numStr.refine((v: string) => Number(v) >= min, { message: `${field.label} must be ${min} or greater` });
      }
      if (c?.max !== undefined) {
        const max = c.max;
        numStr = numStr.refine((v: string) => Number(v) <= max, { message: `${field.label} must be ${max} or less` });
      }
      if (required) return z.string().min(1, `${field.label} is required`).pipe(numStr);
      // Optional integer fields still arrive as '' from an untouched controlled input.
      return z.union([numStr, z.literal('')]).optional();
    }
    case 'select':
    case 'radio': {
      const values = (field.options ?? []).map((o) => o.value) as [string, ...string[]];
      if (values.length === 0) return required ? z.string().min(1) : z.string().optional();
      const enumType = required
        ? z.enum(values, { message: `${field.label} is required` })
        : z.enum(values);
      return required ? enumType : z.union([enumType, z.literal('')]).optional();
    }
    default: {
      // text, textarea, ssn, aNumber, date
      let str = z.string();
      const c = field.constraints;
      if (c?.minLength) str = str.min(c.minLength, `${field.label} is too short`);
      if (c?.maxLength) str = str.max(c.maxLength, `${field.label} is too long`);

      const pattern = c?.pattern ? new RegExp(c.pattern) : DEFAULT_PATTERNS[field.type];
      if (pattern) {
        str = str.regex(pattern, c?.patternMessage ?? DEFAULT_MESSAGES[field.type] ?? `Invalid ${field.label}`);
      }

      if (required) return str.min(1, `${field.label} is required`);
      // Optional text fields still arrive as '' from an untouched controlled input.
      return z.union([str, z.literal('')]).optional();
    }
  }
}

/** Reusable across a normal step's `fields` and a repeating group's per-entry `fields`. */
export function buildFieldsZodSchema(fields: FieldSchema[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    shape[field.name] = buildFieldZodType(field);
  }
  return z.object(shape);
}

export function buildStepZodSchema(step: StepSchema) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of step.fields) {
    shape[field.name] = buildFieldZodType(field);
  }
  if (step.repeating) {
    // Each entry is already validated against its own per-field constraints when
    // it's saved (see RepeatingGroupField's EntryForm) — the outer step form only
    // ever holds the array of already-validated entries as an opaque value.
    shape[step.repeating.answerKey] = z.array(z.record(z.string(), z.unknown()));
  }
  return z.object(shape);
}
