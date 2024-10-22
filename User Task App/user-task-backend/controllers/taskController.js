const { v4: uuidv4 } = require('uuid');
const tasks = []; // In-memory task storage

// Get Tasks for Authenticated User
const getTasks = (req, res) => {
  const userTasks = tasks.filter(task => task.userId === req.user.id);
  res.json(userTasks);
};

// Get Task by ID for Authenticated User
const getTaskById = (req, res) => {
  const task = tasks.find(task => task.id === req.params.id && task.userId === req.user.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

// Create Task
const createTask = (req, res) => {
  const newTask = {
    id: uuidv4(),
    userId: req.user.id,
    title: req.body.title,
    completed: req.body.completed || false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Update Task by ID
const updateTask = (req, res) => {
  const task = tasks.find(task => task.id === req.params.id && task.userId === req.user.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = req.body.title || task.title;
  task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;

  res.json(task);
};

// Delete Task by ID
const deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex(task => task.id === req.params.id && task.userId === req.user.id);
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });

  tasks.splice(taskIndex, 1);
  res.json({ message: 'Task deleted' });
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
