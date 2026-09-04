import { useMemo, useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import type { RepeatingGroupSchema } from '../../engine/schema/types';
import { buildFieldsZodSchema } from '../../engine/schema/buildZodSchema';
import { SchemaField } from './SchemaField';
import { uswds } from '../../theme';

type Entry = Record<string, unknown>;

interface RepeatingGroupFieldProps {
  group: RepeatingGroupSchema;
}

function summarizeEntry(group: RepeatingGroupSchema, entry: Entry): string {
  const parts = group.summaryFieldNames
    .map((name) => entry[name])
    .filter((v) => v !== undefined && v !== null && v !== '')
    .map(String);
  return parts.length > 0 ? parts.join(', ') : '(no details entered)';
}

function defaultEntryValues(group: RepeatingGroupSchema, existing?: Entry) {
  return Object.fromEntries(
    group.fields.map((f) => [f.name, existing?.[f.name] ?? (f.type === 'checkbox' ? false : '')]),
  );
}

/**
 * The one place a StepSchema.repeating turns into an actual list-of-entries UI —
 * every real myUSCIS page that captures a theoretically-unlimited set of entries
 * (address history, employers, prior marriages, ...) uses this same list/add-form
 * pattern. Bound to the outer step's form as a single Controller-managed array
 * value, exactly the way CheckboxField/RadioField already bind complex MUI state —
 * so from WizardStepView's `commitAndGo` perspective this is just one more field.
 */
export function RepeatingGroupField({ group }: RepeatingGroupFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={group.answerKey}
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <RepeatingGroupEditor group={group} entries={(field.value as Entry[]) ?? []} onChange={field.onChange} />
      )}
    />
  );
}

function RepeatingGroupEditor({
  group,
  entries,
  onChange,
}: {
  group: RepeatingGroupSchema;
  entries: Entry[];
  onChange: (entries: Entry[]) => void;
}) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  if (isAdding || editingIndex !== null) {
    const existing = editingIndex !== null ? entries[editingIndex] : undefined;
    return (
      <EntryForm
        group={group}
        existing={existing}
        onCancel={() => {
          setIsAdding(false);
          setEditingIndex(null);
        }}
        onSave={(values) => {
          const next = [...entries];
          if (editingIndex !== null) next[editingIndex] = values;
          else next.push(values);
          onChange(next);
          setIsAdding(false);
          setEditingIndex(null);
        }}
      />
    );
  }

  return (
    <Box sx={{ mb: 3 }}>
      {entries.length > 0 && (
        <Table size="small" sx={{ mb: 2, border: `1px solid ${uswds.baseLighter}` }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>{group.summaryColumnLabel}</TableCell>
              <TableCell sx={{ fontWeight: 700 }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, i) => (
              <TableRow key={i}>
                <TableCell>{summarizeEntry(group, entry)}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
                    <Button size="small" onClick={() => setEditingIndex(i)}>
                      Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => onChange(entries.filter((_, idx) => idx !== i))}>
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Button variant="outlined" onClick={() => setIsAdding(true)}>
        Add {group.entryNoun}
      </Button>
    </Box>
  );
}

/**
 * A separate, nested react-hook-form instance scoped to just this one entry's
 * fields — its FormProvider shadows the outer step form's, so SchemaField
 * (which reads useFormContext()) renders/validates exactly as it would for a
 * normal step, just against this smaller per-entry schema. Deliberately not a
 * nested <form> element (invalid HTML, unreliable submit-event bubbling) —
 * "Save"/"Cancel" are plain buttons that drive methods.handleSubmit directly.
 */
function EntryForm({
  group,
  existing,
  onCancel,
  onSave,
}: {
  group: RepeatingGroupSchema;
  existing?: Entry;
  onCancel: () => void;
  onSave: (values: Entry) => void;
}) {
  const zodSchema = useMemo(() => buildFieldsZodSchema(group.fields), [group]);
  const methods = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: defaultEntryValues(group, existing),
    mode: 'onBlur',
  });

  function handleSave() {
    void methods.handleSubmit((values) => onSave(values))();
  }

  return (
    <FormProvider {...methods}>
      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        {group.fields.map((field) => (
          <SchemaField key={field.name} field={field} visible required={Boolean(field.constraints?.required)} />
        ))}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleSave}>
            Save {group.entryNoun}
          </Button>
          <Button variant="text" onClick={onCancel}>
            Cancel
          </Button>
        </Stack>
      </Paper>
    </FormProvider>
  );
}
