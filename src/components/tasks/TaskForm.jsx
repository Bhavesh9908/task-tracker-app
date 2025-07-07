import { useState, useEffect } from 'react';

function TaskForm({ onSubmit, initialTask, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  // Initialize form when editing
  useEffect(() => {
    if (initialTask) {
      setFormData({
        title: initialTask.title,
        description: initialTask.description || '',
        priority: initialTask.priority || 'medium',
        dueDate: initialTask.dueDate || ''
      });
    } else {
      // Reset form when not editing
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: ''
      });
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSubmit(formData);
      // Only clear if not in edit mode
      if (!initialTask) {
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          dueDate: ''
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task title"
        required
      />
      
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description (optional)"
      />
      
      <div className="form-row">
        <select 
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="priority-select"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          min={new Date().toISOString().split('T')[0]}
          className="due-date-input"
        />
      </div>
      
      <div className="form-actions">
        <button type="submit">
          {initialTask ? 'Update Task' : 'Add Task'}
        </button>
        {initialTask && (
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;