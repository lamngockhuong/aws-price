'use client';

import { useState, useMemo, useEffect, type ReactNode } from 'react';
import type { PricingEntry } from '@/lib/types';
import { formatPrice, formatMonthlyPrice } from '@/lib/utils/formatPrice';

interface PricingTableProps {
  pricing: PricingEntry[];
  serviceId: string;
}

type SortColumn = string | null;
type SortDirection = 'asc' | 'desc';

const DEFAULT_ITEMS_PER_PAGE = 50;

export default function PricingTable({ pricing, serviceId }: Readonly<PricingTableProps>) {
  const [sortColumn, setSortColumn] = useState<SortColumn>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(DEFAULT_ITEMS_PER_PAGE);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Keep hooks order stable; handle empty state in render below
  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedQuery(query.trim().toLowerCase());
      setCurrentPage(1);
    }, 250);
    return () => clearTimeout(handle);
  }, [query]);

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
    return [
      { key: 'feature', label: 'Feature' },
      { key: 'usageType', label: 'Usage Type' },
      { key: 'pricePerUnit', label: 'Price' },
      { key: 'unit', label: 'Unit' },
      { key: 'region', label: 'Region' },
    ];
  };

  const columns = getColumns();

  const filteredPricing = useMemo(() => {
    if (!debouncedQuery) return pricing;
    const q = debouncedQuery;
    return pricing.filter((entry) => {
      for (const column of columns) {
        let raw: string;
        if (column.key === 'pricePerUnit') {
          raw = String(entry.pricePerUnit);
        } else if (column.key === 'pricePerMonth') {
          raw = entry.unit.includes('hour') ? String(formatMonthlyPrice(entry.pricePerUnit)) : 'N/A';
        } else if (column.key === 'unit') {
          raw = entry.unit;
        } else if (column.key === 'region') {
          raw = entry.region;
        } else {
          raw = entry.attributes[column.key] || (entry[column.key as keyof PricingEntry]?.toString() ?? '');
        }
        if (raw && raw.toString().toLowerCase().includes(q)) {
          return true;
        }
      }
      return false;
    });
  }, [pricing, debouncedQuery, columns]);

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
    const sorted = [...filteredPricing].sort((a, b) => {
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
  }, [filteredPricing, sortColumn, sortDirection]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedPricing.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPricing = sortedPricing.slice(startIndex, endIndex);
  const highlightMatch = (text: string): ReactNode => {
    if (!debouncedQuery || !text) return text;
    const lower = text.toLowerCase();
    const idx = lower.indexOf(debouncedQuery);
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + debouncedQuery.length);
    const after = text.slice(idx + debouncedQuery.length);
    return (
      <>
        {before}
        <mark className="rounded bg-yellow-200/70 px-0.5 text-zinc-900 dark:bg-yellow-300/40 dark:text-zinc-900">{match}</mark>
        {after}
      </>
    );
  };

  return (
    <div className="overflow-x-auto rounded-lg bg-surface border border-border">
      {pricing.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-zinc-600 dark:text-zinc-400">No pricing data available</p>
        </div>
      ) : (
        <>
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <label htmlFor="pricing-search" className="sr-only">Search pricing</label>
          <input
            id="pricing-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rows..."
            className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder-zinc-500"
          />
          {query && (
            <button
              aria-label="Clear search"
              onClick={() => setQuery('')}
              className="rounded-md border border-zinc-300 bg-white px-2 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Clear
            </button>
          )}
        </div>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          {debouncedQuery ? (
            <span>
              {filteredPricing.length} match{filteredPricing.length === 1 ? '' : 'es'}
            </span>
          ) : (
            <span>{pricing.length} total rows</span>
          )}
        </div>
      </div>
      {filteredPricing.length === 0 ? (
        <div className="p-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          No matching results
        </div>
      ) : (
      <>
      <table className="min-w-full divide-y divide-border">
        <thead className="sticky top-0 z-10 bg-overlay">
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
        <tbody className="divide-y divide-border bg-surface">
          {paginatedPricing.map((entry, index) => {
            // Use unique key based on serviceId, region, and main attributes
            // Avoid JSON.stringify for performance
            const mainAttr = entry.attributes.instanceType || entry.attributes.feature || entry.attributes.storageClass || '';
            const uniqueKey = `${entry.serviceId}-${entry.region}-${mainAttr}-${startIndex + index}`;
            return (
            <tr
              key={uniqueKey}
              className="hover:bg-zinc-50 dark:hover:bg-zinc-800 even:bg-zinc-50/40 dark:even:bg-zinc-800/60"
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
                    className={`whitespace-nowrap px-6 py-4 text-sm text-zinc-900 dark:text-zinc-50 ${
                      column.key === 'pricePerUnit' || column.key === 'pricePerMonth' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {typeof cellContent === 'string' ? highlightMatch(cellContent) : cellContent}
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
            <div className="flex items-center gap-3">
              <label className="text-sm text-zinc-600 dark:text-zinc-400">Rows per page</label>
              <select
                aria-label="Rows per page"
                className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50"
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              >
                {[25, 50, 100].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <div className="w-px self-stretch bg-zinc-200 dark:bg-zinc-700" />
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
        </div>
      )}
      </>
      )}
        </>
      )}
    </div>
  );
}

