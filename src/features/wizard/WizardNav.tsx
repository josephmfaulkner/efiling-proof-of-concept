import { useFormContext } from 'react-hook-form';
import { Button } from '../../components/ui/Button';

interface WizardNavProps {
  isFirstStep: boolean;
  onBack: () => void;
}

export function WizardNav({ isFirstStep, onBack }: WizardNavProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
      <Button type="button" variant="ghost" onClick={onBack}>
        {isFirstStep ? 'Save & exit to dashboard' : 'Back'}
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        Continue
      </Button>
    </div>
  );
}
