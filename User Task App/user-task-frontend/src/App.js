import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';
import './index.css'; // Import global CSS

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login' or 'register'
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState(false); // false = pending, true = completed

  // Fetch tasks for the authenticated user
  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data); // Update task list
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task for the authenticated user
  const handleAddTask = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/tasks',
        {
          title: newTaskTitle,
          completed: newTaskStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks([...tasks, res.data]); // Add the new task to the task list
      setNewTaskTitle(''); // Clear the input field after task creation
      setNewTaskStatus(false); // Reset task status to 'pending'
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Conditional rendering based on login status
  return (
    <div className="App">
      {/* Navbar to switch between Login and Register */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Show Login or Register based on currentPage, OR Task Management if logged in */}
      {!token ? (
        <>
          {currentPage === 'login' && <Login setToken={setToken} />}
          {currentPage === 'register' && <Register />}
        </>
      ) : (
        <div className="task-manager">
          <h2>Welcome! Manage your tasks here:</h2>

          {/* Add Task Section */}
          <div className="task-form">
            <h3>Create a New Task</h3>
            <input
              type="text"
              placeholder="New Task Title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <select
              value={newTaskStatus}
              onChange={(e) => setNewTaskStatus(e.target.value === 'true')}
            >
              <option value={false}>Pending</option>
              <option value={true}>Completed</option>
            </select>
            <button onClick={handleAddTask}>Add Task</button>
          </div>

          {/* Fetch and List Tasks */}
          <div className="task-list">
            <h3>Your Tasks</h3>
            <button onClick={fetchTasks}>Fetch Tasks</button>
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  {task.title} - {task.completed ? 'Completed' : 'Pending'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
