"use client";

export default function InfoBanner({
  updatedAt,
}: {
  updatedAt?: string;
}) {
  return (
    <div className="mb-4 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200">
      <span>
        Pricing data updated on{' '}
        <span suppressHydrationWarning>{updatedAt ?? ''}</span>
        .
      </span>
    </div>
  );
}


