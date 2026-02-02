import React from 'react';
import TaskItem from './taskitem';
import '../styles/tasklist.css';

function TaskList({ tasks, onToggle, onDelete }) {

    return (
        <div className="task-list-container">
            {tasks.length > 0 ? (
                <div className="task-carousel">
                    <div className="carousel-track">
                        {tasks.map((task, index) => (
                            <TaskItem
                                key={`${task.id}-${index}`}
                                task={task}
                                onToggle={onToggle}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="empty-state">
                    <p>All clear. No tasks found.</p>
                </div>
            )}
        </div>
    );
}

export default TaskList;