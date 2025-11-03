export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-text tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-muted/90 max-w-prose">{subtitle}</p>
      )}
    </div>
  );
}


