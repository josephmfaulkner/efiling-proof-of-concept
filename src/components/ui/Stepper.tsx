interface StepperProps {
  steps: Array<{ id: string; title: string }>;
  currentStepId: string;
}

export function Stepper({ steps, currentStepId }: StepperProps) {
  const currentIndex = steps.findIndex((s) => s.id === currentStepId);

  return (
    <div className="mb-6">
      <p className="mb-2 text-sm text-slate-500">
        Step {currentIndex + 1} of {steps.length}
      </p>
      <div className="flex gap-1">
        {steps.map((step, i) => (
          <div key={step.id} className={`h-1.5 flex-1 rounded-full ${i <= currentIndex ? 'bg-blue-700' : 'bg-slate-200'}`} />
        ))}
      </div>
    </div>
  );
}
