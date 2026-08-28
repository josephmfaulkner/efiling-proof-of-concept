import { Link } from 'react-router-dom';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { listApplications, type ApplicationRecord } from '../../engine/persistence/applicationsRegistry';
import { Layout } from '../../components/ui/Layout';
import { ProgressTracker } from './ProgressTracker';

function resumeRoute(app: ApplicationRecord): string {
  switch (app.status) {
    case 'started':
    case 'in_progress':
      return `/apply/${app.id}/wizard`; // WizardPage redirects to the actor's real current step
    case 'evidence_review':
      return `/apply/${app.id}/evidence`;
    case 'ready_to_download':
      return `/apply/${app.id}/review`;
    case 'downloaded':
      return `/apply/${app.id}/download`;
  }
}

export function DashboardPage() {
  const applications = listApplications();

  return (
    <Layout maxWidth="lg">
      <Typography variant="h1" sx={{ mb: 3 }}>
        My Applications
      </Typography>

      {applications.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4 }}>
          <Typography sx={{ mb: 2, color: 'text.secondary' }}>You don&apos;t have any applications yet.</Typography>
          <Typography component={Link} to="/" sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none' }}>
            Start one from the home page →
          </Typography>
        </Paper>
      ) : (
        <Stack spacing={2}>
          {applications.map((app) => (
            <Paper key={app.id} variant="outlined" sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h3" sx={{ fontSize: '1.05rem' }}>
                  {app.formTitle}
                </Typography>
                <Typography
                  component={Link}
                  to={resumeRoute(app)}
                  variant="body2"
                  sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none' }}
                >
                  {app.status === 'downloaded' ? 'View again' : 'Resume'} →
                </Typography>
              </Box>
              <ProgressTracker status={app.status} />
            </Paper>
          ))}
        </Stack>
      )}
    </Layout>
  );
}
