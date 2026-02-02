import React from 'react';
import '../styles/taskitem.css';

function TaskItem({ task, onToggle, onDelete, onEdit }) {


    return (
        <div className={`task-card ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
                <div className="task-header">
                    <h3 className="task-title">{task.title}</h3>
                    <span className={`task-priority priority-${task.priority}`}>{task.priority}</span>
                </div>
                <p className="task-desc">{task.description}</p>
            </div>
            <div className="task-actions">
                <button className="btn-toggle" onClick={() => onToggle(task.id)}>
                    {task.completed ? 'Undo' : 'Done'}
                </button>
                <button className="btn-edit" onClick={() => onEdit(task)}>Edit</button>
                <button className="btn-delete" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
        </div>
    );
}

export default TaskItem;