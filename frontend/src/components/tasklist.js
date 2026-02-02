import React, { useState } from 'react';
import TaskItem from './taskitem';
import '../styles/tasklist.css';

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
    const [isPaused, setIsPaused] = useState(false);

    // Only animate if 3+ tasks
    const shouldAnimate = tasks.length >= 3;
    const duration = tasks.length * 10;

    // Duplicate tasks for seamless infinite loop
    const displayTasks = shouldAnimate ? [...tasks, ...tasks] : tasks;

    return (
        <div className="task-list-container">
            {tasks.length > 0 ? (
                <div
                    className="task-carousel"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div
                        className={`carousel-track ${shouldAnimate && !isPaused ? '' : 'paused'}`}
                        style={{ animationDuration: shouldAnimate ? `${duration}s` : '0s' }}
                    >
                        {displayTasks.map((task, index) => (
                            <TaskItem
                                key={`${task.id}-${index}`}
                                task={task}
                                onToggle={onToggle}
                                onDelete={onDelete}
                                onEdit={onEdit}
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
