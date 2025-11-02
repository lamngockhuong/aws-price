import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">404</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Service not found
        </p>
        <Link
          href="/services"
          className="mt-6 inline-block rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100"
        >
          Back to Services
        </Link>
      </div>
    </div>
  );
}

