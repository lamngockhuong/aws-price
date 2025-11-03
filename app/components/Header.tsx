"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
// Preline-style Button Toggle (sun/moon)

export default function Header() {
  const [theme, setTheme] = useState<string>(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  function applyClass(next: string) {
    const root = document.documentElement;
    if (next === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", next);
  }

  function applyTheme(next: string) {
    setTheme(next);
  }

  // toggle handled via Switch onChange

  useEffect(() => {
    applyClass(theme);
  }, [theme]);

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto w-full max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-medium text-neutral-900 dark:text-neutral-100">
            AWS Price Tracker
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          <a
            href="https://github.com/lamngockhuong/aws-price"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
            title="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.486 2 12.017c0 4.424 2.865 8.18 6.839 9.504.5.092.682-.218.682-.485 0-.24-.009-.876-.014-1.72-2.782.605-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.465-1.11-1.465-.908-.622.069-.609.069-.609 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338-2.221-.253-4.555-1.114-4.555-4.957 0-1.095.39-1.99 1.03-2.688-.103-.253-.447-1.272.098-2.65 0 0 .84-.269 2.75 1.027A9.564 9.564 0 0 1 12 6.844c.851.004 1.707.115 2.507.338 1.909-1.296 2.748-1.027 2.748-1.027.546 1.378.202 2.397.099 2.65.64.698 1.028 1.593 1.028 2.688 0 3.852-2.337 4.701-4.565 4.95.359.31.678.923.678 1.86 0 1.343-.012 2.427-.012 2.756 0 .27.18.58.688.481A10.02 10.02 0 0 0 22 12.017C22 6.486 17.523 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}


