import { IoSearchOutline } from 'react-icons/io5';
import { useEffect, useRef } from 'react';

const TaskFilters = ({ filter, search, sort, onFilterChange, onSearchChange, onSortChange }) => {
  const searchTimeout = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    // Debounce search
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      onSearchChange(value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, []);

  return (
    <div className="filters-bar">
      <div className="filter-pills">
        <button
          className={`filter-pill ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`filter-pill ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => onFilterChange('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-pill ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>

      <div className="search-box">
        <IoSearchOutline />
        <input
          type="text"
          placeholder="Search tasks..."
          defaultValue={search}
          onChange={handleSearch}
        />
      </div>

      <select
        className="sort-select form-input form-select"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="priority">By Priority</option>
        <option value="dueDate">By Due Date</option>
      </select>
    </div>
  );
};

export default TaskFilters;
