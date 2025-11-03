import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

export function ButtonPrimary({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        'rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-black dark:text-[#1f2937] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-2 focus-visible:outline-accent/70 focus-visible:outline-offset-1',
        className
      )}
      {...props}
    />
  );
}

export function LinkButtonPrimary({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-black dark:text-[#1f2937] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline-2 focus-visible:outline-accent/70 focus-visible:outline-offset-1',
        className
      )}
    >
      {children}
    </Link>
  );
}


