import React, { useState, useEffect, useCallback } from 'react';
import TaskList from './components/tasklist';
import TaskForm from './components/taskform';
import TaskFilter from './components/taskfilter';
import './styles/App.css'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [deleteId, setDeleteId] = useState(null);
  const [editTask, setEditTask] = useState(null);


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

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    await fetch(`http://localhost:4000/api/tasks/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditTask({ ...task });
  };

  const confirmEdit = async () => {
    await fetch(`http://localhost:4000/api/tasks/${editTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editTask)
    });
    setEditTask(null);
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
          <TaskList tasks={filteredTasks} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
      </div>

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-box">
            <p>Are you sure you want to delete this task?</p>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn-confirm" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {editTask && (
        <div className="modal-overlay">
          <div className="modal-box edit-modal">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
              placeholder="Title"
            />
            <input
              type="text"
              value={editTask.description}
              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
              placeholder="Description"
            />
            <select
              value={editTask.priority}
              onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setEditTask(null)}>Cancel</button>
              <button className="btn-save" onClick={confirmEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;