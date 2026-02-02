import React, { useState, useEffect, useCallback } from 'react';
import TaskList from './components/tasklist';
import TaskForm from './components/taskform';
import TaskFilter from './components/taskfilter';
import './styles/App.css'; // Importing the clean styles below

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Wrapped in useCallback to keep the API logic clean
  const fetchTasks = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:4000/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = async (newTask) => {
    await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    });
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await fetch(`http://localhost:4000/api/tasks/${id}/toggle`, { method: 'PATCH' });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/api/tasks/${id}`, { method: 'DELETE' });
    fetchTasks();
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'completed') return t.completed;
    if (filter === 'pending') return !t.completed;
    return true;
  });

  return (
    <div className="main-wrapper">
      <div className="content-card">
        <header className="app-header">
          <h1>Shon's Task Manager</h1>
        </header>
        
        <TaskForm onAddTask={handleAddTask} />
        <TaskFilter currentFilter={filter} setFilter={setFilter} />
        
        <div className="carousel-section">
          <TaskList tasks={filteredTasks} onToggle={handleToggle} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;