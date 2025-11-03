import Link from 'next/link';
import type { AWSService } from '@/lib/types';

interface ServiceCardProps {
  service: AWSService;
}

export default function ServiceCard({ service }: Readonly<ServiceCardProps>) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="group block rounded-xl bg-surface border border-border p-6 shadow-none transform-gpu transition-colors duration-fast hover:shadow-soft hover:scale-[1.01]"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-zinc-950 dark:text-zinc-50 dark:group-hover:text-white">
            {service.name}
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {service.description}
          </p>
          <span className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium text-zinc-700 dark:text-zinc-300 ${
            service.category === 'Compute' ? 'bg-blue-50 dark:bg-blue-900/30' :
            service.category === 'Database' ? 'bg-purple-50 dark:bg-purple-900/30' :
            service.category === 'Storage' ? 'bg-orange-50 dark:bg-orange-900/30' :
            service.category === 'Networking' ? 'bg-teal-50 dark:bg-teal-900/30' : 'bg-zinc-100 dark:bg-zinc-800'
          }`}>
            {service.category}
          </span>
        </div>
        <div className="ml-4 h-8 w-8 shrink-0 rounded-md bg-[#FF9900]/10 text-[#FF9900] grid place-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

