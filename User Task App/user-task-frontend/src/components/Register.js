import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/register', {
        username: registerUsername,
        password: registerPassword,
      });
      alert('User registered successfully! Now login.');
      setRegisterUsername('');
      setRegisterPassword('');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={registerUsername}
        onChange={(e) => setRegisterUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={registerPassword}
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
