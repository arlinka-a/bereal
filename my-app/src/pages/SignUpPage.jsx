import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

function SignUpPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signUp(username, password);
      navigate('/login'); // Redirect to login page after successful sign up
    } catch (err) {
      setError('Failed to create an account');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpPage;