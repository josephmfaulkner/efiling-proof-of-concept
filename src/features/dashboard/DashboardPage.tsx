import { Link } from 'react-router-dom';
import { listApplications, type ApplicationRecord } from '../../engine/persistence/applicationsRegistry';
import { Layout } from '../../components/ui/Layout';
import { Card } from '../../components/ui/Card';
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
    <Layout>
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">My Applications</h1>

      {applications.length === 0 ? (
        <Card>
          <p className="mb-4 text-slate-600">You don't have any applications yet.</p>
          <Link to="/" className="font-medium text-blue-700 hover:underline">
            Start one from the home page →
          </Link>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-slate-900">{app.formTitle}</h2>
                <Link to={resumeRoute(app)} className="text-sm font-medium text-blue-700 hover:underline">
                  {app.status === 'downloaded' ? 'View again' : 'Resume'} →
                </Link>
              </div>
              <ProgressTracker status={app.status} />
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}
