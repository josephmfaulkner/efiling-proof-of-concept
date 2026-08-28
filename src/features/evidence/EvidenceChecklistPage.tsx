import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import { getApplication, updateApplication } from '../../engine/persistence/applicationsRegistry';
import { getForm } from '../../engine/registry/formRegistry';
import { loadSnapshot, extractContext } from '../../engine/persistence/wizardPersistence';
import type { EvidenceItem } from '../../engine/evidence/types';
import { Layout } from '../../components/ui/Layout';
import { InfoCallout } from '../../components/layout/InfoCallout';
import { DropZone } from '../../components/fields/DropZone';
import { uswds } from '../../theme';

function EvidenceRow({ item }: { item: EvidenceItem }) {
  const [attached, setAttached] = useState<File | undefined>(undefined);

  return (
    <Paper variant="outlined" sx={{ p: 2.5 }}>
      <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
      {item.description && (
        <Typography variant="body2" sx={{ mt: 0.5, mb: 1.5, color: uswds.ink }}>
          {item.description}
        </Typography>
      )}
      <Box sx={{ mt: 1.5 }}>
        <DropZone id={`evidence-${item.key}`} value={attached} onChange={setAttached} />
      </Box>
    </Paper>
  );
}

export function EvidenceChecklistPage() {
  const { applicationId = '' } = useParams();
  const navigate = useNavigate();
  const application = getApplication(applicationId);

  if (!application) {
    return (
      <Layout>
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Typography>We couldn&apos;t find that application.</Typography>
        </Paper>
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
      <Paper variant="outlined" sx={{ p: { xs: 3, sm: 5 } }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Evidence Checklist
        </Typography>
        <InfoCallout>
          Based on your answers, here&apos;s what you&apos;ll likely need to submit. This list is
          illustrative only — it is not a complete or legally vetted checklist for your specific
          case.
        </InfoCallout>

        <Typography variant="overline" sx={{ display: 'block', color: uswds.ink, fontWeight: 700, mb: 1 }}>
          Always required
        </Typography>
        <Stack spacing={1.5} sx={{ mb: 4 }}>
          {alwaysItems.map((item) => (
            <EvidenceRow key={item.key} item={item} />
          ))}
        </Stack>

        {conditionalItems.length > 0 && (
          <>
            <Typography variant="overline" sx={{ display: 'block', color: uswds.ink, fontWeight: 700, mb: 1 }}>
              Based on your answers
            </Typography>
            <Stack spacing={1.5} sx={{ mb: 4 }}>
              {conditionalItems.map((item) => (
                <EvidenceRow key={item.key} item={item} />
              ))}
            </Stack>
          </>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: `1px solid ${uswds.baseLighter}`, pt: 3, mt: 2 }}>
          <Button variant="contained" onClick={handleContinue}>
            Continue to Review
          </Button>
        </Box>
      </Paper>
    </Layout>
  );
}
