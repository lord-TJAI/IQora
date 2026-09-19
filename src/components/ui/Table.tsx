import React from 'react';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  renderMobileCard?: (item: T) => React.ReactNode;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  isLoading,
  emptyMessage = 'No data available',
  renderMobileCard,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-card border border-brand-border p-6 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-slate-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full bg-white rounded-card border border-brand-border p-8 text-center text-sm text-brand-text-secondary">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Card View (Section 100 fallback) */}
      {renderMobileCard ? (
        <div className="md:hidden space-y-3">
          {data.map((item) => (
            <div
              key={keyExtractor(item)}
              onClick={() => onRowClick && onRowClick(item)}
              className={cn(onRowClick && 'cursor-pointer')}
            >
              {renderMobileCard(item)}
            </div>
          ))}
        </div>
      ) : null}

      {/* Desktop / Tablet Table */}
      <div
        className={cn(
          'w-full bg-white rounded-card border border-brand-border shadow-subtle overflow-hidden',
          renderMobileCard && 'hidden md:block'
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-border bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-brand-text-secondary">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      'py-3.5 px-4 sm:px-6',
                      col.hideOnMobile && 'hidden lg:table-cell',
                      col.className
                    )}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-sm text-brand-text-primary">
              {data.map((item) => (
                <tr
                  key={keyExtractor(item)}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={cn(
                    'transition-colors hover:bg-slate-50/80',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        'py-4 px-4 sm:px-6',
                        col.hideOnMobile && 'hidden lg:table-cell',
                        col.className
                      )}
                    >
                      {col.render ? col.render(item) : (item as any)[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-between py-3', className)}>
      <span className="text-xs text-brand-text-secondary font-medium">
        Page <span className="font-bold text-brand-text-primary">{currentPage}</span> of{' '}
        <span className="font-bold text-brand-text-primary">{totalPages}</span>
      </span>
      <div className="flex items-center gap-1.5">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="p-1.5 rounded-lg border border-brand-border text-brand-text-secondary hover:text-brand-text-primary hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="p-1.5 rounded-lg border border-brand-border text-brand-text-secondary hover:text-brand-text-primary hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}) => {
  return (
    <div className={cn('relative flex items-center', className)}>
      <Search className="w-4 h-4 text-brand-text-secondary absolute left-3 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-4 py-2 bg-white border border-brand-border rounded-input text-sm text-brand-text-primary placeholder:text-brand-text-muted focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
      />
    </div>
  );
};
