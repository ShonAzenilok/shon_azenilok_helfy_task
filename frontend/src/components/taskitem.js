import React from 'react';
import '../styles/taskitem.css';

function TaskItem({ task, onToggle, onDelete }) {


    return (
        <div className={`task-card ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-desc">{task.description}</p>
            </div>
            <div className="task-actions">
                <button className="btn-toggle" onClick={() => onToggle(task.id)}>
                    {task.completed ? 'Undo' : 'Done'}
                </button>
                <button className="btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
}

export default TaskItem;