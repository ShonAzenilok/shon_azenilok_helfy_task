const express = require('express');
const cors = require('cors');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = 4000;
const DB_PATH = './tasks.json';

app.use(cors());
app.use(express.json());

// Helper functions
function getAllTasksFromFile() {
    const rawData = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(rawData);
}

function saveTasksToFile(tasksArray) {
    const stringData = JSON.stringify(tasksArray, null, 2);
    fs.writeFileSync(DB_PATH, stringData);
}

// Get all tasks
app.get('/api/tasks', (req, res) => {
    try {
        const tasks = getAllTasksFromFile();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Error reading tasks" });
    }
});

// Create a new task
app.post('/api/tasks', (req, res) => {
    try {
        const tasks = getAllTasksFromFile();
        const { title, description, priority } = req.body;

        // very basic input validation
        if (!title || !description || !priority) {
            return res.status(400).json({
                message: "Validation Error: missing data"
            });
        }

        const newTask = {
            id: crypto.randomUUID(),
            title: title,
            description: description,
            completed: false,
            createdAt: new Date().toISOString(),
            priority: priority
        };

        tasks.push(newTask);
        saveTasksToFile(tasks);
        res.status(201).json(newTask);
    } catch (err) {
        console.error("DETAILED ERROR:", err);
        res.status(500).json({ message: "Could not save task" });
    }
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
    try {
        const tasks = getAllTasksFromFile();
        const taskId = req.params.id;

        const taskIndex = tasks.findIndex(t => t.id === taskId);
        if (taskIndex === -1) return res.status(404).json({ message: "Task not found" });

        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        saveTasksToFile(tasks);
        res.status(200).json(tasks[taskIndex]);
    } catch (err) {
        res.status(500).json({ message: "Update failed" });
    }
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
    try {
        let tasks = getAllTasksFromFile();
        const taskId = req.params.id;

        const exists = tasks.some(t => t.id === taskId);
        if (!exists) return res.status(404).json({ message: "Task not found" });

        const updatedTasks = tasks.filter(t => t.id !== taskId);
        saveTasksToFile(updatedTasks);
        res.status(200).json({ message: "Deleted!" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});

// Toggle task completion status
app.patch('/api/tasks/:id/toggle', (req, res) => {
    try {
        const tasks = getAllTasksFromFile();
        const taskId = req.params.id;

        const task = tasks.find(t => t.id === taskId);
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.completed = !task.completed;
        saveTasksToFile(tasks);
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: "Toggle failed" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));