function TaskFilter({ filter, onFilterChange, taskCounts }) {
  return (
    <div className="task-filter">
      <button
        className={filter === 'all' ? 'active' : ''}
        onClick={() => onFilterChange('all')}
      >
        All ({taskCounts.all})
      </button>
      <button
        className={filter === 'pending' ? 'active' : ''}
        onClick={() => onFilterChange('pending')}
      >
        Pending ({taskCounts.pending})
      </button>
      <button
        className={filter === 'completed' ? 'active' : ''}
        onClick={() => onFilterChange('completed')}
      >
        Completed ({taskCounts.completed})
      </button>
    </div>
  );
}

export default TaskFilter;