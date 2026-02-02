import React, { useState } from 'react';
import '../styles/taskform.css';

function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('medium');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        onAddTask({
            title: title.trim(),
            description: desc,
            priority: priority
        });

        setTitle('');
        setDesc('');
        setPriority('medium');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <div className="form-row">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title..."
                    required
                    className="input-title"
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="input-priority"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div className="form-row">
                <input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Add a description"
                    className="input-desc"
                />
                <button type="submit">Add Task</button>
            </div>
        </form>
    );
}

export default TaskForm;