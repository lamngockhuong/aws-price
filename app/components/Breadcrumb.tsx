"use client";

import Link from "next/link";

type Crumb = { label: string; href?: string };

export default function Breadcrumb({
  items,
}: {
  items: Crumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-zinc-600 dark:text-zinc-400">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-zinc-900 dark:text-zinc-50">{item.label}</span>
              )}
              {!isLast && <span className="px-1 text-zinc-500">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}


