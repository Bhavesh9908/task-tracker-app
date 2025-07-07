import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import TaskList from '../components/tasks/TaskList';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  
  // Safely get and parse user data
  const getUserData = () => {
    try {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        // Check if it's already an object (from previous implementation)
        if (typeof userData === 'string' && userData.startsWith('{')) {
          return JSON.parse(userData);
        }
        // Handle case where it's just the username string
        return {
          username: userData,
          email: ''
        };
      }
      return { username: '', email: '' };
    } catch (error) {
      console.error('Error parsing user data:', error);
      return { username: '', email: '' };
    }
  };

  const currentUser = getUserData();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  return (
    <div className={`dashboard-container ${darkMode ? 'dark-mode' : ''}`}>
      <header className="dashboard-header">
        <div className="user-info">
          <h1>Welcome, {currentUser.username || 'User'}!</h1>
          {currentUser.email && <p>{currentUser.email}</p>}
        </div>
        
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <button 
            onClick={toggleDarkMode} 
            className="theme-toggle"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <button 
            onClick={handleLogout} 
            className="logout-button"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="task-manager">
        <TaskList searchTerm={searchTerm} />
      </main>
    </div>
  );
}

export default Dashboard;