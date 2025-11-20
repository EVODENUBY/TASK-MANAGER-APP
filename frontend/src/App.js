import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTaskStatus, deleteTask } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  
  // Filter tasks based on the selected filter
  useEffect(() => {
    const filterTasks = () => {
      if (filter === 'all') {
        setFilteredTasks(tasks);
      } else {
        setFilteredTasks(tasks.filter(task => task.status === filter));
      }
    };
    
    filterTasks();
  }, [tasks, filter]);

  // Fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
        setError(null);
      } catch (err) {
        setError('Failed to load The tasks. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const createdTask = await createTask({
        title: newTask.title.trim(),
        description: newTask.description.trim()
      });
      
      setTasks(prev => [createdTask, ...prev]);
      setNewTask({ title: '', description: '' });
      setError(null);
    } catch (err) {
      setError('Failed to create task.');
      console.error(err);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
      const updatedTask = await updateTaskStatus(id, newStatus);
      
      setTasks(prev => 
        prev.map(task => 
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      setError(null);
    } catch (err) {
      setError('Failed to update task status. Please try again.');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="app">
      <h1>Task Manager App</h1>
      
      <div className="task-form">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              placeholder="Task title"
              required
            />
          </div>
          <div>
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Task description (optional)"
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Task'}
          </button>
        </form>
      </div>

      <div className="task-list">
        <div className="task-list-header">
          <h2>Tasks</h2>
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
              onClick={() => setFilter('in-progress')}
            >
              In Progress
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p>No {filter === 'all' ? '' : filter + ' '}tasks found. {filter !== 'all' && 'Try changing the filter.'}</p>
        ) : (
          <ul>
            {filteredTasks.map((task) => (
              <li key={task._id} className={task.status}>
                <div className="task-content">
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                  <span>Status: {task.status}</span>
                  <span className="created-at">
                    {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="task-actions">
                  <button 
                    onClick={() => handleStatusToggle(task._id, task.status)}
                    className="status-btn"
                  >
                    {task.status === 'completed' ? 'Mark as Pending' : 'Mark as Completed'}
                  </button>
                  <button 
                    onClick={() => handleDelete(task._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
