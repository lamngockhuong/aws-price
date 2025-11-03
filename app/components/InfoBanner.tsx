"use client";

import Link from "next/link";

export default function InfoBanner({
  updatedAt,
  sourceUrl,
}: {
  updatedAt?: string;
  sourceUrl: string;
}) {
  const date = updatedAt ?? new Date().toISOString().slice(0, 10);
  return (
    <div className="mb-4 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200">
      <span>
        Pricing data updated on {date} — Source: {" "}
      </span>
      <Link
        href={sourceUrl}
        className="underline decoration-zinc-400 underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
        target="_blank"
        rel="noreferrer"
      >
        AWS Calculator API
      </Link>
      .
    </div>
  );
}


