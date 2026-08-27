import type { ReactNode } from 'react';

interface FieldShellProps {
  name: string;
  label: string;
  required?: boolean;
  helpText?: string;
  error?: string;
  children: ReactNode;
}

export function FieldShell({ name, label, required, helpText, error, children }: FieldShellProps) {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </label>
      {children}
      {helpText && !error && <p className="mt-1 text-sm text-slate-500">{helpText}</p>}
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClasses = (hasError?: string) =>
  `block w-full rounded-md border px-3 py-2 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    hasError ? 'border-red-400' : 'border-slate-300'
  }`;
