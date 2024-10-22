import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        username: loginUsername,
        password: loginPassword,
      });
      setToken(res.data.token);
      alert('Logged in successfully!');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
