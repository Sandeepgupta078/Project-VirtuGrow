const Task = require('../models/TaskModel');

// Create a new task
exports.createTask = async (req, res) => {
    // console.log('Authenticated user:', req.user);

    try {
        const { title, description, status } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        const newTask = await Task.create({ 
            title, 
            description: description || '', 
            status: status || 'pending', 
            user: req.user.id 
        });
        res.status(201).json({
            data: newTask,
            message: 'Task created successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create task',
            error: error.message
        });
    }
};

// Get all tasks for a user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.status(200).json({
            tasks,
            message: 'Tasks fetched successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch tasks',
            error
        });
    }
}

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            task,
            message: 'Task updated successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failded to update task',
            error: error.message
        })
    }
}

//  delete a task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({
            message: 'Task deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to delete task',
            error: error.message
        })
    }
}