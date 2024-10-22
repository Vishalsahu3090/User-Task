const express = require('express');
const { registerUser, loginUser, getAllUsers, getUserById } = require('../controllers/userController');
const { adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', adminMiddleware, getAllUsers);
router.get('/:id', adminMiddleware, getUserById);

module.exports = router;
