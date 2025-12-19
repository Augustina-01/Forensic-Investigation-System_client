import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserToStorage } from '../Utils/StorageUtils';
import '../Styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      const user = { username: credentials.username, role: 'admin' };
      saveUserToStorage(user);
      navigate('/admin-dashboard');
    } else if (credentials.username && credentials.password) {
      const user = { username: credentials.username, role: 'public' };
      saveUserToStorage(user);
      navigate('/public-dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <h1>🔐 System Login</h1>
          <p>Access Forensic Investigation System</p>
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>
        
        <div className="login-info">
          <p><strong>Demo Credentials:</strong></p>
          <p>Admin: username: <code>admin</code> / password: <code>admin123</code></p>
          <p>Public: Any username/password combination</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
