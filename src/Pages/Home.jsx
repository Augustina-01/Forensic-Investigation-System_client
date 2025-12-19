import { Link } from 'react-router-dom';
import '../Styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-overlay">
          <h1>Forensic Investigation System</h1>
          <p>Advanced Case Management & Clue Matching Technology</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
            <Link to="/about" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Clue Analysis</h3>
            <p>Advanced algorithms to match clues with existing cases</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📁</div>
            <h3>Case Management</h3>
            <p>Store and organize case files efficiently</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚠️</div>
            <h3>Threat Detection</h3>
            <p>Automatic threat level assessment for cases</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Suspect Tracking</h3>
            <p>Identify suspects based on case similarities</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-time Updates</h3>
            <p>Access up-to-date case information instantly</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Access</h3>
            <p>Role-based access for admin and public users</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Solve Cases?</h2>
        <p>Join our platform and start investigating today</p>
        <Link to="/login" className="btn btn-large">Access System</Link>
      </section>
    </div>
  );
};

export default Home;
