interface TodoFiltersProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
}

export function TodoFilters({ filter, onFilterChange }: TodoFiltersProps) {
  return (
    <div className="flex gap-2 mb-4">
      {['all', 'active', 'completed'].map((filterType) => (
        <button
          key={filterType}
          onClick={() => onFilterChange(filterType as any)}
          className={`px-3 py-1 rounded ${
            filter === filterType ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
        </button>
      ))}
    </div>
  );
}
