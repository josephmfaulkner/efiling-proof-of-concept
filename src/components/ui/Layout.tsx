import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-semibold text-slate-900">
            myFiling <span className="font-normal text-slate-500">(proof of concept)</span>
          </Link>
          <Link to="/dashboard" className="text-sm font-medium text-blue-700 hover:underline">
            My Applications
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>
      <footer className="mx-auto max-w-3xl px-6 pb-10 text-xs text-slate-400">
        Not affiliated with USCIS or DHS. Educational proof of concept only — not legal advice, and not a real filing
        channel.
      </footer>
    </div>
  );
}
