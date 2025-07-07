// Get tasks for specific user
export const getTasks = (username) => {
  const tasks = localStorage.getItem(`tasks_${username}`);
  return tasks ? JSON.parse(tasks) : [];
};

// Save tasks for specific user
export const saveTasks = (username, tasks) => {
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

// Initialize with sample data if empty
export const initializeSampleData = (username) => {
  if (!localStorage.getItem(`tasks_${username}`)) {
    const sampleTasks = [
      {
        id: Date.now(),
        title: "Complete React assignment",
        description: "Build a task tracker application",
        completed: false,
        priority: "medium",
        dueDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      },
      {
        id: Date.now() + 1,
        title: "Review JavaScript concepts",
        description: "Go through ES6+ features",
        completed: true,
        priority: "low",
        dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
      }
    ];
    saveTasks(username, sampleTasks);
  }
};