import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../LoginSignup.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://my-gigit-app-b9bbde9c9441.herokuapp.com/users/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token); // Store token in local storage

          // Decode token to get user type
          try {
            const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
            const usertype = decodedToken.usertype || (decodedToken.user && decodedToken.user.usertype);

            console.log(decodedToken);

            if (usertype === 'worker') {
              navigate('/gig-workers');
            } else {
              navigate('/gig-bosses');
            }
          } catch (error) {
            console.error('Error decoding token:', error);
            setMessage('Failed to decode token.');
          }
        } else {
          setMessage('Invalid email or password');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setMessage('An error occurred. Please try again.');
      });
  };


  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
