import { Box, Typography } from '@mui/material';
import type { ApplicationStatus } from '../../engine/persistence/applicationsRegistry';
import { uswds } from '../../theme';

/** A Domino's-order-tracker-style bar — mirrors the user's mental model of "where's my order" more than a generic progress bar. */
const STAGES: Array<{ status: ApplicationStatus; label: string }> = [
  { status: 'started', label: 'Order Placed' },
  { status: 'in_progress', label: 'Being Prepared' },
  { status: 'evidence_review', label: 'Quality Check' },
  { status: 'ready_to_download', label: 'Ready for Pickup' },
  { status: 'downloaded', label: 'Delivered' },
];

export function ProgressTracker({ status }: { status: ApplicationStatus }) {
  const currentIndex = STAGES.findIndex((s) => s.status === status);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {STAGES.map((stage, i) => (
        <Box
          key={stage.status}
          sx={{ display: 'flex', alignItems: 'center', flex: i < STAGES.length - 1 ? 1 : '0 0 auto' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                height: 32,
                width: 32,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                fontSize: '0.75rem',
                fontWeight: 700,
                bgcolor: i <= currentIndex ? uswds.primary : uswds.baseLighter,
                color: i <= currentIndex ? uswds.white : uswds.base,
              }}
            >
              {i + 1}
            </Box>
            <Typography
              variant="caption"
              sx={{ mt: 0.5, width: 80, textAlign: 'center', color: i <= currentIndex ? uswds.inkDarkest : uswds.baseLight }}
            >
              {stage.label}
            </Typography>
          </Box>
          {i < STAGES.length - 1 && (
            <Box sx={{ mx: 1, height: 2, flex: 1, bgcolor: i < currentIndex ? uswds.primary : uswds.baseLighter }} />
          )}
        </Box>
      ))}
    </Box>
  );
}
