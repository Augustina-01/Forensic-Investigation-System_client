import { Link, useNavigate } from 'react-router-dom';
import { loadUserFromStorage, clearStorage } from '../Utils/StorageUtils';
import '../Styles/Header.css';

const Header = () => {
  const navigate = useNavigate();
  const user = loadUserFromStorage();

  const handleLogout = () => {
    clearStorage();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>🔍 Forensic Investigation System</h1>
          </Link>
        </div>
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          {user ? (
            <>
              <Link to={user.role === 'admin' ? '/admin-dashboard' : '/public-dashboard'} className="nav-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout ({user.username})
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link login-btn">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
