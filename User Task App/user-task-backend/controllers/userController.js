const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const users = []; // In-memory user storage (no DB)

// Register User
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    username,
    password: hashedPassword,
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
};

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

// Admin-only: Get All Users
const getAllUsers = (req, res) => {
  res.json(users);
};

// Admin-only: Get User by ID
const getUserById = (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
};
