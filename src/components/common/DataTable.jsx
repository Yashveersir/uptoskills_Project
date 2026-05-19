import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Archive, ChevronDown, ChevronLeft, ChevronRight, ChevronsUpDown, Download, Search, Trash2 } from "lucide-react";
import Button from "./Button";
import EmptyState from "./EmptyState";
import Input from "./Input";

const DataTable = ({
  data,
  columns,
  rowId = "id",
  title,
  description,
  searchPlaceholder = "Search records...",
  searchableKeys = [],
  filters = [],
  bulkActions = [],
  rowActions,
  emptyTitle = "No records found",
  emptyDescription = "Try adjusting your search or filters.",
  isLoading = false,
  pageSize = 6,
}) => {
  const [query, setQuery] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState(() =>
    filters.reduce((acc, filter) => ({ ...acc, [filter.key]: filter.multiple ? [] : "All" }), {})
  );

  const getRowId = (row) => row[rowId];

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return data.filter((row) => {
      const matchesSearch = !normalizedQuery || searchableKeys.some((key) =>
        String(row[key] ?? "").toLowerCase().includes(normalizedQuery)
      );

      const matchesFilters = filters.every((filter) => {
        const value = filterState[filter.key];
        if (filter.multiple) {
          return value.length === 0 || value.includes(row[filter.key]);
        }
        return value === "All" || row[filter.key] === value;
      });

      return matchesSearch && matchesFilters;
    });
  }, [data, filterState, filters, query, searchableKeys]);

  const sortedRows = useMemo(() => {
    if (!sortConfig) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredRows, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
  const start = (page - 1) * pageSize;
  const currentRows = sortedRows.slice(start, start + pageSize);
  const currentIds = currentRows.map(getRowId);
  const allCurrentSelected = currentRows.length > 0 && currentIds.every((id) => selectedIds.includes(id));

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction: current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const toggleSelectAll = () => {
    setSelectedIds((current) =>
      allCurrentSelected
        ? current.filter((id) => !currentIds.includes(id))
        : [...new Set([...current, ...currentIds])]
    );
  };

  const toggleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id]
    );
  };

  const updateFilter = (filter, option) => {
    setPage(1);
    setFilterState((current) => {
      if (!filter.multiple) return { ...current, [filter.key]: option };

      const selected = current[filter.key];
      return {
        ...current,
        [filter.key]: selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option],
      };
    });
  };

  const defaultBulkActions = [
    { label: "Export", icon: Download, variant: "outline", onClick: () => {} },
    { label: "Archive", icon: Archive, variant: "outline", onClick: () => {} },
  ];
  const resolvedBulkActions = bulkActions.length > 0 ? bulkActions : defaultBulkActions;

  return (
    <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-card dark:border-neutral-800 dark:bg-neutral-900">
      {(title || description) && (
        <header className="border-b border-neutral-200 px-5 py-4 dark:border-neutral-800 sm:px-6">
          {title && <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">{title}</h2>}
          {description && <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>}
        </header>
      )}

      <div className="flex flex-col gap-3 border-b border-neutral-200 p-4 dark:border-neutral-800 lg:flex-row lg:items-center lg:justify-between">
        <Input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          icon={Search}
          placeholder={searchPlaceholder}
          containerClassName="w-full lg:max-w-sm"
        />
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <div key={filter.key} className="relative">
              {filter.multiple ? (
                <details className="group">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 text-sm font-medium text-neutral-600 transition-colors hover:border-secondary-500 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
                    {filter.label}
                    <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="absolute right-0 z-20 mt-2 w-56 rounded-lg border border-neutral-200 bg-white p-2 shadow-overlay dark:border-neutral-800 dark:bg-neutral-900">
                    {filter.options.map((option) => (
                      <label key={option} className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800">
                        <input
                          type="checkbox"
                          checked={filterState[filter.key].includes(option)}
                          onChange={() => updateFilter(filter, option)}
                          className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </details>
              ) : (
                <select
                  value={filterState[filter.key]}
                  onChange={(event) => updateFilter(filter, event.target.value)}
                  className="min-h-[44px] rounded-lg border border-neutral-200 bg-neutral-50 px-4 text-sm font-medium text-neutral-600 outline-none transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
                >
                  <option>All</option>
                  {filter.options.map((option) => <option key={option}>{option}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex flex-col gap-3 overflow-hidden border-b border-primary-100 bg-primary-50 px-5 py-3 dark:border-primary-500/20 dark:bg-primary-500/10 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">{selectedIds.length} selected</span>
            <div className="flex flex-wrap gap-2">
              {resolvedBulkActions.map((action) => {
                const Icon = action.icon || Trash2;
                return (
                  <Button
                    key={action.label}
                    size="sm"
                    variant={action.variant || "outline"}
                    onClick={() => action.onClick(selectedIds, setSelectedIds)}
                  >
                    <Icon size={14} />
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-background-header dark:bg-neutral-800">
            <tr>
              <th className="w-12 px-5 py-4">
                <input
                  type="checkbox"
                  aria-label="Select visible rows"
                  checked={allCurrentSelected}
                  onChange={toggleSelectAll}
                  className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                />
              </th>
              {columns.map((column) => (
                <th key={column.key} className={`px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 ${column.className || ""}`}>
                  {column.sortable ? (
                    <button type="button" onClick={() => handleSort(column.key)} className="inline-flex items-center gap-2 hover:text-primary-600">
                      {column.header}
                      <ChevronsUpDown size={14} />
                    </button>
                  ) : column.header}
                </th>
              ))}
              {rowActions && <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {isLoading ? Array.from({ length: pageSize }).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-5 py-5"><div className="h-4 w-4 rounded bg-neutral-100 dark:bg-neutral-800" /></td>
                {columns.map((column) => (
                  <td key={column.key} className="px-5 py-5"><div className="h-4 w-32 rounded bg-neutral-100 dark:bg-neutral-800" /></td>
                ))}
                {rowActions && <td className="px-5 py-5"><div className="ml-auto h-8 w-20 rounded bg-neutral-100 dark:bg-neutral-800" /></td>}
              </tr>
            )) : currentRows.map((row, index) => {
              const id = getRowId(row);
              return (
                <motion.tr
                  layout
                  key={id}
                  className={`${index % 2 === 1 ? "bg-neutral-50/60 dark:bg-neutral-950/30" : ""} ${selectedIds.includes(id) ? "bg-primary-50 dark:bg-primary-500/10" : ""} group transition-colors hover:bg-secondary-50/70 dark:hover:bg-neutral-800/60`}
                >
                  <td className="px-5 py-5">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${id}`}
                      checked={selectedIds.includes(id)}
                      onChange={() => toggleSelect(id)}
                      className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={column.key} className={`px-5 py-5 text-sm text-neutral-700 dark:text-neutral-300 ${column.cellClassName || ""}`}>
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                  {rowActions && <td className="px-5 py-5 text-right">{rowActions(row)}</td>}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!isLoading && sortedRows.length === 0 && (
        <div className="p-5">
          <EmptyState title={emptyTitle} desc={emptyDescription} icon={Search} />
        </div>
      )}

      {!isLoading && sortedRows.length > 0 && (
        <footer className="flex flex-col gap-3 border-t border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-950/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Showing <span className="font-semibold text-neutral-900 dark:text-neutral-100">{start + 1}</span> to <span className="font-semibold text-neutral-900 dark:text-neutral-100">{Math.min(start + pageSize, sortedRows.length)}</span> of <span className="font-semibold text-neutral-900 dark:text-neutral-100">{sortedRows.length}</span>
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
              <ChevronLeft size={16} />
              Previous
            </Button>
            <Button size="sm" variant="outline" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={page === totalPages}>
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </footer>
      )}
    </section>
  );
};

export default DataTable;
