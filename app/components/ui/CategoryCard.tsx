import Link from 'next/link';

export function CategoryCard({ href, title, subtitle }: { href: string; title: string; subtitle?: string }) {
  return (
    <Link
      href={href}
      className="group block rounded-xl bg-surface border border-border p-6 shadow-none transition-shadow hover:shadow-soft focus-visible:outline-2 focus-visible:outline-accent/70 focus-visible:outline-offset-1"
    >
      <h3 className="text-lg font-semibold text-text group-hover:opacity-90">{title}</h3>
      {subtitle && <p className="mt-2 text-sm text-muted">{subtitle}</p>}
    </Link>
  );
}


