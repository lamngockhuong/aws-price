'use client';

import { useState } from 'react';
import type { PricingEntry } from '@/lib/types';
import { formatPrice, formatMonthlyPrice } from '@/lib/utils/formatPrice';

interface PricingTableProps {
  pricing: PricingEntry[];
  serviceId: string;
}

type SortColumn = string | null;
type SortDirection = 'asc' | 'desc';

export default function PricingTable({ pricing, serviceId }: Readonly<PricingTableProps>) {
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  if (pricing.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-zinc-600 dark:text-zinc-400">No pricing data available</p>
      </div>
    );
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedPricing = [...pricing].sort((a, b) => {
    if (!sortColumn) return 0;

    let aValue: string | number = a.attributes[sortColumn] || '';
    let bValue: string | number = b.attributes[sortColumn] || '';

    // Handle special cases for non-attribute columns
    if (sortColumn === 'region') {
      aValue = a.region;
      bValue = b.region;
    } else if (sortColumn === 'pricePerUnit') {
      aValue = a.pricePerUnit;
      bValue = b.pricePerUnit;
    } else if (sortColumn === 'unit') {
      aValue = a.unit;
      bValue = b.unit;
    }

    // Convert to string for comparison
    const aStr = String(aValue);
    const bStr = String(bValue);

    // Try to convert to number for proper sorting
    const aNum = parseFloat(aStr);
    const bNum = parseFloat(bStr);

    if (!isNaN(aNum) && !isNaN(bNum)) {
      const comparison = aNum - bNum;
      return sortDirection === 'asc' ? comparison : -comparison;
    }

    // String comparison
    const comparison = aStr.localeCompare(bStr);
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const getColumns = () => {
    if (serviceId === 'ec2') {
      return [
        { key: 'instanceType', label: 'Instance Type' },
        { key: 'vcpu', label: 'vCPU' },
        { key: 'memory', label: 'Memory' },
        { key: 'operatingSystem', label: 'OS' },
        { key: 'pricePerUnit', label: 'Price/hour' },
        { key: 'pricePerMonth', label: 'Price/month' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 's3') {
      return [
        { key: 'storageClass', label: 'Storage Tier' },
        { key: 'requestType', label: 'Request Type' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 'vpc') {
      return [
        { key: 'feature', label: 'Feature' },
        { key: 'usageType', label: 'Usage Type' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    return [];
  };

  const columns = getColumns();

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
        <thead className="bg-zinc-50 dark:bg-zinc-800">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-700"
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {sortColumn === column.key && (
                    <span className="text-zinc-900 dark:text-zinc-50">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
          {sortedPricing.map((entry, index) => (
            <tr
              key={index}
              className="hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              {columns.map((column) => {
                let cellContent: string;

                if (column.key === 'pricePerUnit') {
                  cellContent = formatPrice(entry.pricePerUnit, entry.unit);
                } else if (column.key === 'pricePerMonth') {
                  cellContent = entry.unit.includes('hour')
                    ? formatMonthlyPrice(entry.pricePerUnit)
                    : 'N/A';
                } else if (column.key === 'unit') {
                  cellContent = entry.unit;
                } else {
                  cellContent = entry.attributes[column.key] || entry[column.key as keyof PricingEntry]?.toString() || '';
                }

                return (
                  <td
                    key={column.key}
                    className="whitespace-nowrap px-6 py-4 text-sm text-zinc-900 dark:text-zinc-50"
                  >
                    {cellContent}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

