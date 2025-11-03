import Link from 'next/link';
import ServicesContent from './ServicesContent';
import Breadcrumb from '@/app/components/Breadcrumb';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="mb-3"><Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} /></div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">AWS Services</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            View and compare pricing for AWS services
          </p>
        </div>

        <ServicesContent />

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

