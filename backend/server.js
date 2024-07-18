const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const taskStatusRoutes = require('./routes/taskStatus');
const uri = 'mongodb://admin:admin@ac-dwrwwgi-shard-00-00.8ok8qve.mongodb.net:27017,ac-dwrwwgi-shard-00-01.8ok8qve.mongodb.net:27017,ac-dwrwwgi-shard-00-02.8ok8qve.mongodb.net:27017/?ssl=true&replicaSet=atlas-xb2zff-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
const app = express();
const PORT = process.env.PORT || 5000;
const initializeTaskStatus = require('./utils/initializeTaskStatus');

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/task-statuses',taskStatusRoutes);

// MongoDB connection
mongoose.connect(uri)
  .then(async() => {
    console.log('MongoDB connected');
    await initializeTaskStatus();
  })
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
