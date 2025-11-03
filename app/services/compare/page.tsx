import Link from 'next/link';

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">Compare Services</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          This feature is currently disabled.
        </p>
        <div className="mt-6">
          <Link href="/services" className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">← Back to Services</Link>
        </div>
      </div>
    </div>
  );
}


