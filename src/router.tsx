import { createBrowserRouter } from 'react-router-dom';
import { LandingPage } from './features/landing/LandingPage';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { WizardPage } from './features/wizard/WizardPage';
import { EvidenceChecklistPage } from './features/evidence/EvidenceChecklistPage';
import { ReviewPage } from './features/review/ReviewPage';
import { DownloadPage } from './features/download/DownloadPage';

export const router = createBrowserRouter([
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
