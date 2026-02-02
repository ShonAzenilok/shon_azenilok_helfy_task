import React from 'react';
import '../styles/taskfilter.css';

function TaskFilter({ currentFilter, setFilter }) {
    return (
        <div className="task-filter">
            <button
                onClick={() => setFilter('all')}
                className={currentFilter === 'all' ? 'active' : ''}
            >
                All Tasks
            </button>
            <button
                onClick={() => setFilter('pending')}
                className={currentFilter === 'pending' ? 'active' : ''}
            >
                Pending
            </button>
            <button
                onClick={() => setFilter('completed')}
                className={currentFilter === 'completed' ? 'active' : ''}
            >
                Completed
            </button>
        </div>
    );
}

export default TaskFilter;