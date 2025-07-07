import TaskForm from './TaskForm';

function TaskItem({ task, onToggle, onEdit, onDelete, isEditing, onEditStart, onEditCancel }) {
  const priorityColors = {
    high: '#ff4444',
    medium: '#ffbb33',
    low: '#00C851'
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      {isEditing ? (
        <TaskForm 
          onSubmit={(updates) => {
            onEdit(updates);
            onEditCancel();
          }}
          initialTask={task}
          onCancel={onEditCancel}
        />
      ) : (
        <>
          <div className="task-content">
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <div className="task-details">
              <div className="task-header">
                <h3 className="task-title">{task.title}</h3>
                <span 
                  className="task-priority" 
                  style={{ backgroundColor: priorityColors[task.priority] }}
                >
                  {task.priority}
                </span>
              </div>
              {task.description && <p className="task-description">{task.description}</p>}
              <div className="task-meta">
                <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
                  📅 {formatDate(task.dueDate)}
                </span>
                <span className="created-at">
                  🕒 {new Date(task.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <div className="task-actions">
            <button onClick={() => onEditStart(task.id)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;