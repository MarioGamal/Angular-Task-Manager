const TaskStatus = require('../models/TaskStatus');

const defaultTaskStatuses = [
  { name: 'to do', enabled: true },
  { name: 'in progress', enabled: true },
  { name: 'completed', enabled: true }
];

const initializeTaskStatus = async () => {
  try {
    const existingStatuses = await TaskStatus.find({ name: { $in: defaultTaskStatuses.map(status => status.name) } });
    const existingStatusNames = existingStatuses.map(status => status.name);

    const statusesToCreate = defaultTaskStatuses.filter(status => !existingStatusNames.includes(status.name));

    if (statusesToCreate.length > 0) {
      await TaskStatus.insertMany(statusesToCreate);
      console.log('Default task statuses initialized');
    } else {
      console.log('Default task statuses already exist');
    }
  } catch (error) {
    console.error('Error initializing task statuses:', error);
  }
};

module.exports = initializeTaskStatus;
