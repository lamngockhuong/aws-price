import ThemeToggle from '@/app/components/ui/ThemeToggle';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border text-sm text-muted">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <p>© {year} AWS Price Tracker</p>
          <ThemeToggle />
        </div>
        <p className="space-x-4">
          <a
            href="/about"
            className="hover:text-text underline-offset-4 hover:underline"
          >
            About
          </a>
          <a
            href="https://github.com/lamngockhuong/aws-price"
            target="_blank"
            rel="noreferrer"
            className="hover:text-text underline-offset-4 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://github.com/lamngockhuong/aws-price/issues/new"
            target="_blank"
            rel="noreferrer"
            className="hover:text-text underline-offset-4 hover:underline"
          >
            Feedback
          </a>
          <a
            href="https://b0.p.awsstatic.com/pricing/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-text underline-offset-4 hover:underline"
          >
            Data source
          </a>
        </p>
      </div>
    </footer>
  );
}


