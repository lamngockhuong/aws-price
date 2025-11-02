import Link from 'next/link';
import type { AWSService } from '@/lib/types';

interface ServiceCardProps {
  service: AWSService;
}

export default function ServiceCard({ service }: Readonly<ServiceCardProps>) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="group block rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-50 dark:group-hover:text-white">
            {service.name}
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {service.description}
          </p>
          <span className="mt-3 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {service.category}
          </span>
        </div>
      </div>
    </Link>
  );
}

