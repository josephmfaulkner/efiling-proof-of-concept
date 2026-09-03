import { createHashRouter } from 'react-router-dom';
import { LandingPage } from './features/landing/LandingPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { WizardPage } from './features/wizard/WizardPage';
import { EvidenceChecklistPage } from './features/evidence/EvidenceChecklistPage';
import { ReviewPage } from './features/review/ReviewPage';
import { DownloadPage } from './features/download/DownloadPage';

// Hash-based routing (URLs like /#/dashboard) rather than createBrowserRouter — GitHub
// Pages is static hosting with no server-side rewrite rule, so a hard refresh or a shared
// deep link on a BrowserRouter path (e.g. /apply/:id/review) would 404. Hash routing never
// asks the server for anything but index.html.
export const router = createHashRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  // Both patterns render WizardPage: resuming from the dashboard doesn't know the exact
  // step id up front, so it links to the stepId-less route and lets WizardPage redirect
  // to wherever the persisted actor snapshot actually is.
  { path: '/apply/:applicationId/wizard', element: <WizardPage /> },
  { path: '/apply/:applicationId/wizard/:stepId', element: <WizardPage /> },
  { path: '/apply/:applicationId/evidence', element: <EvidenceChecklistPage /> },
  { path: '/apply/:applicationId/review', element: <ReviewPage /> },
  { path: '/apply/:applicationId/download', element: <DownloadPage /> },
]);
