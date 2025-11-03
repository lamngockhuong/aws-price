"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
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

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
    try {
      document.cookie = `theme=${theme}; path=/; max-age=31536000`;
    } catch {}
  }, [theme]);

  function toggle() {
    try {
      const root = document.documentElement;
      root.classList.add('disable-transitions');
      setTheme(theme === 'dark' ? 'light' : 'dark');
      setTimeout(() => root.classList.remove('disable-transitions'), 180);
    } catch {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  }

  return (
    <button suppressHydrationWarning
      type="button"
      aria-label="Toggle color theme"
      aria-pressed={theme === "dark"}
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-text hover:bg-overlay focus-visible:outline-2 focus-visible:outline-accent/70 focus-visible:outline-offset-1 transition-colors duration-fast"
      title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
    >
      {/* Render both icons to avoid hydration mismatch; toggle with CSS */}
      <span className="inline dark:hidden">
        {/* Moon for light toggle target */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z"/>
        </svg>
      </span>
      <span className="hidden dark:inline">
        {/* Sun when in dark mode */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm13.657 6.657a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707Zm-9.9-9.9A1 1 0 0 1 6.343 7.343l-.707-.707A1 1 0 0 1 7.05 5.222l.707.707Zm9.9-1.435a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 1 1-1.414 1.414l-.707-.707Zm-9.9 9.9a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707Z"/>
        </svg>
      </span>
    </button>
  );
}


