const express = require('express');
const router = express.Router();
const TaskStatus = require('../models/TaskStatus');
const authMiddleware = require('../middleware/auth');

// Get all task statuses
router.get('/', authMiddleware, async (req, res) => {
  try {
    const taskStatuses = await TaskStatus.find();
    res.status(200).json(taskStatuses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task statuses', error });
  }
});

// Add a new task status
router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;
  try {
    const newTaskStatus = new TaskStatus({ name });
    const taskStatus = await newTaskStatus.save();
    res.status(201).json(taskStatus);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task status', error });
  }
});

// Update task status
router.put('/:id', authMiddleware, async (req, res) => {
  const { name, enabled } = req.body;
  try {
    const taskStatus = await TaskStatus.findById(req.params.id);
    if (!taskStatus) {
      return res.status(404).json({ message: 'Task status not found' });
    }
    taskStatus.name = name !== undefined ? name : taskStatus.name;
    taskStatus.enabled = enabled !== undefined ? enabled : taskStatus.enabled;
    await taskStatus.save();
    res.status(200).json(taskStatus);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error });
  }
});

module.exports = router;
