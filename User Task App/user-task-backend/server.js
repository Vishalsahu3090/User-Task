const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { authMiddleware, adminMiddleware } = require('./middleware/authMiddleware');

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parsing middleware

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes); // Tasks routes are protected

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// 404 Middleware
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not finsd' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
