import type { ApplicationStatus } from '../../engine/persistence/applicationsRegistry';

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
    <div className="flex items-center">
      {STAGES.map((stage, i) => (
        <div key={stage.status} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                i <= currentIndex ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {i + 1}
            </div>
            <span className={`mt-1 w-20 text-center text-xs ${i <= currentIndex ? 'text-slate-900' : 'text-slate-400'}`}>
              {stage.label}
            </span>
          </div>
          {i < STAGES.length - 1 && <div className={`mx-1 h-0.5 flex-1 ${i < currentIndex ? 'bg-blue-700' : 'bg-slate-200'}`} />}
        </div>
      ))}
    </div>
  );
}
