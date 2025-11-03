'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { services } from '@/lib/data/services';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search services...',
}: Readonly<SearchBarProps>) {
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return services
      .filter(s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q))
      .slice(0, 8);
  }, [value]);

  return (
    <div className="relative">
      <input
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open && !!value.trim()}
        aria-controls="service-suggestions"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 pl-10 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500"
      />
      <svg
        className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {open && value.trim() && (
        <div className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border border-zinc-200 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-900">
          {suggestions.length === 0 ? (
            <div className="px-3 py-2 text-sm text-zinc-500 dark:text-zinc-400">No matches</div>
          ) : (
            <ul id="service-suggestions" role="listbox" className="max-h-72 overflow-auto py-1">
              {suggestions.map((s) => {
                const q = value.trim();
                const name = s.name;
                const idx = name.toLowerCase().indexOf(q.toLowerCase());
                const before = name.slice(0, idx);
                const match = name.slice(idx, idx + q.length);
                const after = name.slice(idx + q.length);
                return (
                  <li key={s.id} role="option" aria-selected={false}>
                    <Link
                      href={`/services/${s.id}`}
                      className="block px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                      {idx >= 0 ? (
                        <span>
                          {before}
                          <mark className="rounded bg-yellow-100 px-0.5 text-zinc-900 dark:bg-yellow-900/50 dark:text-yellow-50">{match}</mark>
                          {after}
                        </span>
                      ) : (
                        name
                      )}
                      <span className="ml-2 text-xs text-zinc-500">({s.category})</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

