import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg text-text">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
        <p className="mt-4 text-muted">
          Service not found
        </p>
        <Link
          href="/services"
          className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-black dark:text-[#1f2937] hover:bg-[var(--primary-hover)] focus-visible:outline-2 focus-visible:outline-accent/70 focus-visible:outline-offset-1"
        >
          Back to Services
        </Link>
      </div>
    </div>
  );
}

