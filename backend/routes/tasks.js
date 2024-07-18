const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

// Add a new task
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, dueDate } = req.body;
  const userId = req.user.userId;

  try {
    const newTask = new Task({
      title,
      description,
      dueDate,
      userId
    });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
});

// Get all tasks for a user
router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const {status,date} = req.query;
  const filter = {userId};

  if (status){
    filter.status = status;
  }

  if (date){
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    filter.createdAt = { $gte: start, $lt: end };
  }

  try {
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

router.get('/today', authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
  
    try {
      const tasks = await Task.find({ userId, createdAt: { $gte: start, $lt: end }, status: 'to do' });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  });

  // Get task stats
router.get('/stats', authMiddleware, async (req, res) => {
    const userId = req.user.userId;
    console.log('user id in stats',userId);
  
    try {
      const toDo = await Task.countDocuments({ userId, status: 'to do' });
      const inProgress = await Task.countDocuments({ userId, status: 'in progress' });
      const completed = await Task.countDocuments({ userId, status: 'completed' });
  
      res.status(200).json({ toDo, inProgress, completed });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching task statistics', error });
    }
  });

  // Get recent completed tasks
  router.get('/completed', authMiddleware, async (req, res) => {
    const userId = req.user.userId;
  
    try {
      const tasks = await Task.find({ userId, status: 'completed' }).sort({ createdAt: -1 }).limit(5);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching recent completed tasks', error });
    }
  });

// Update task category
router.put('/:id', authMiddleware, async (req, res) => {
  const updateFields = req.body;
  console.log('req body',req.body);
  const userId = req.user.userId;
  const taskId = req.params.id;
  const validStatuses = ['to do', 'in progress', 'completed'];
  //console.log('update task req',req);
  if (updateFields.status && !validStatuses.includes(updateFields.status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  
  try {
    console.log('task id',taskId);
    const task = await Task.findOne({ _id: taskId, userId });

  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  Object.keys(updateFields).forEach(key => {
    task[key] = updateFields[key];
  })
  await task.save();
  res.status(200).json(task);
} catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
    }
    });

    // Update task details
router.put('/details/:id', authMiddleware, async (req, res) => {
    const { title, description, dueDate } = req.body;
    const userId = req.user.userId;
  
    try {
      const task = await Task.findOne({ _id: req.params.id, userId });
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.title = title;
      task.description = description;
      task.dueDate = dueDate;
      await task.save();
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  });
    
    module.exports = router;
