'use client';

import { useState, useMemo, useEffect } from 'react';
import type { PricingEntry } from '@/lib/types';
import { formatPrice, formatMonthlyPrice } from '@/lib/utils/formatPrice';

interface PricingTableProps {
  pricing: PricingEntry[];
  serviceId: string;
}

type SortColumn = string | null;
type SortDirection = 'asc' | 'desc';

const ITEMS_PER_PAGE = 50;

export default function PricingTable({ pricing, serviceId }: Readonly<PricingTableProps>) {
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);

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

  // Memoize sorted pricing for performance
  const sortedPricing = useMemo(() => {
    const sorted = [...pricing].sort((a, b) => {
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

    return sorted;
  }, [pricing, sortColumn, sortDirection]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedPricing.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPricing = sortedPricing.slice(startIndex, endIndex);

  // Reset to page 1 when pricing changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pricing.length]);

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
        { key: 'usageType', label: 'Usage Type' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 'vpc' || serviceId === 'natgateway') {
      return [
        { key: 'feature', label: 'Feature' },
        { key: 'usageType', label: 'Usage Type' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 'lambda') {
      return [
        { key: 'memory', label: 'Memory (MB)' },
        { key: 'usageType', label: 'Usage Type' },
        { key: 'requests', label: 'Requests' },
        { key: 'computeDuration', label: 'Compute Duration' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 'cloudfront') {
      return [
        { key: 'feature', label: 'Feature' },
        { key: 'usageType', label: 'Usage Type' },
        { key: 'dataTransferClass', label: 'Data Transfer Class' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 'translate') {
      return [
        { key: 'feature', label: 'Feature' },
        { key: 'usageType', label: 'Usage Type' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 'apigateway') {
      return [
        { key: 'feature', label: 'Feature' },
        { key: 'usageType', label: 'Usage Type' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 'ecs' || serviceId === 'eks') {
      return [
        { key: 'feature', label: 'Feature' },
        { key: 'usageType', label: 'Usage Type' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 'redshift') {
      return [
        { key: 'feature', label: 'Feature' },
        { key: 'usageType', label: 'Usage Type' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 'dynamodb') {
      return [
        { key: 'feature', label: 'Feature' },
        { key: 'usageType', label: 'Usage Type' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    if (serviceId === 'sns') {
      return [
        { key: 'feature', label: 'Feature' },
        { key: 'usageType', label: 'Usage Type' },
        { key: 'pricePerUnit', label: 'Price' },
        { key: 'unit', label: 'Unit' },
        { key: 'region', label: 'Region' },
      ];
    }
    // Generic fallback for services without specific column config
    return [
      { key: 'feature', label: 'Feature' },
      { key: 'usageType', label: 'Usage Type' },
      { key: 'pricePerUnit', label: 'Price' },
      { key: 'unit', label: 'Unit' },
      { key: 'region', label: 'Region' },
    ];
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
          {paginatedPricing.map((entry, index) => {
            // Use unique key based on serviceId, region, and main attributes
            // Avoid JSON.stringify for performance
            const mainAttr = entry.attributes.instanceType || entry.attributes.feature || entry.attributes.storageClass || '';
            const uniqueKey = `${entry.serviceId}-${entry.region}-${mainAttr}-${startIndex + index}`;
            return (
            <tr
              key={uniqueKey}
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
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-zinc-700 dark:text-zinc-300">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(endIndex, sortedPricing.length)}</span> of{' '}
              <span className="font-medium">{sortedPricing.length}</span> results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`rounded-md px-3 py-2 text-sm font-medium ${
                        currentPage === pageNum
                          ? 'bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900'
                          : 'border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

