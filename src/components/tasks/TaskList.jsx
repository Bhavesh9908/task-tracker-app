import { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import { getTasks, saveTasks } from '../../utils/storage';

function TaskList({ username }) {
  const [tasks, setTasks] = useState(getTasks(username));
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const searchedTasks = filteredTasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const addTask = (newTask) => {
    const taskToAdd = {
      ...newTask,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [...tasks, taskToAdd];
    setTasks(updatedTasks);
    saveTasks(username, updatedTasks);
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(username, updatedTasks);
  };

  const editTask = (taskId, updates) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    setTasks(updatedTasks);
    saveTasks(username, updatedTasks);
    setEditingTaskId(null);
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
      saveTasks(username, updatedTasks);
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-controls">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <TaskFilter 
          filter={filter} 
          onFilterChange={setFilter} 
          taskCounts={{
            all: tasks.length,
            completed: tasks.filter(t => t.completed).length,
            pending: tasks.filter(t => !t.completed).length,
          }}
        />
      </div>
      
      <TaskForm 
        onSubmit={editingTaskId ? 
          (updates) => editTask(editingTaskId, updates) : 
          addTask
        }
        initialTask={editingTaskId ? tasks.find(t => t.id === editingTaskId) : null}
        onCancel={() => setEditingTaskId(null)}
      />
      
      {searchedTasks.length > 0 ? (
        <div className="tasks">
          {searchedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onEdit={(updates) => editTask(task.id, updates)}
              onDelete={deleteTask}
              isEditing={editingTaskId === task.id}
              onEditStart={() => setEditingTaskId(task.id)}
              onEditCancel={() => setEditingTaskId(null)}
            />
          ))}
        </div>
      ) : (
        <p className="no-tasks">No tasks found. Add a new task above!</p>
      )}
    </div>
  );
}

export default TaskList;