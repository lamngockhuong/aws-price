import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg text-text">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
        <p className="mt-3 text-muted">This page could not be found.</p>
        <div className="mt-6">
          <Link
            href="/"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-black dark:text-[#1f2937] hover:bg-[var(--primary-hover)] focus-visible:outline-2 focus-visible:outline-accent/70 focus-visible:outline-offset-1"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}


