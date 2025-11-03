import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        overlay: 'var(--overlay)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--text-muted)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
      },
      borderRadius: { xl: 'var(--radius)' },
      boxShadow: { soft: 'var(--shadow)' },
      transitionDuration: { fast: '150ms', base: '180ms' },
    },
  },
  plugins: [],
} satisfies Config


