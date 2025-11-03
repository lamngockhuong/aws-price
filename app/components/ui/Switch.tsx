import React from 'react';
import { cn } from '@/lib/utils/cn';

type SwitchProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  label?: string;
};

export function Switch({ checked, onCheckedChange, className, label }: SwitchProps) {
  return (
    <label className={cn('inline-flex items-center gap-2 cursor-pointer select-none', className)}>
      {label && <span className="text-sm text-muted">{label}</span>}
      <span className="relative inline-block h-6 w-11">
        <input
          type="checkbox"
          role="switch"
          aria-checked={checked}
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
        />
        <span className="absolute inset-0 rounded-full bg-overlay border border-border transition-colors duration-fast peer-checked:bg-primary" />
        <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-surface border border-border transition-transform duration-fast peer-checked:translate-x-5" />
      </span>
    </label>
  );
}


