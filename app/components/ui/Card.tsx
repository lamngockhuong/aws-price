import { cn } from '@/lib/utils/cn';
import React from 'react';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-xl shadow-none transition-shadow hover:shadow-soft',
        className
      )}
      {...props}
    />
  );
}


