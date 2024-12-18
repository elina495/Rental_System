import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between login and sign-up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Only for sign-up

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignUp ? 'http://localhost:5000/register' : 'http://localhost:5000/login';
    const payload = isSignUp
      ? { username, email, password }
      : { email, password };

    try {
      const response = await axios.post(endpoint, payload);
      alert(response.data.message);
    } catch (error) {
      alert('Error: ' + error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button
          className={`toggle-btn ${!isSignUp ? 'active' : ''}`}
          onClick={() => setIsSignUp(false)}
        >
          Log In
        </button>
        <button
          className={`toggle-btn ${isSignUp ? 'active' : ''}`}
          onClick={() => setIsSignUp(true)}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>

        {isSignUp && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
      </form>
    </div>
  );
};

export default AuthPage;
