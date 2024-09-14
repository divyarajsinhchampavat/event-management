import React, { useState } from 'react';
import { login } from '../services/authService';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      localStorage.setItem('token', response.access_token);
      window.location.href = '/events'; // Redirect to events page
    } catch (error) {
      console.error('Login failed', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
   
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginForm;
