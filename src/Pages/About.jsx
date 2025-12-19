import '../Styles/About.css';

const About = () => {
  return (
    <div className="about">
      <section className="about-hero">
        <h1>About Forensic Investigation System</h1>
        <p>Revolutionizing Criminal Investigation Through Technology</p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            The Forensic Investigation System is designed to streamline the investigation process
            by providing law enforcement agencies with cutting-edge tools for case management,
            clue analysis, and suspect identification. Our mission is to help solve cases faster
            and more efficiently through intelligent data matching and analysis.
          </p>
        </div>

        <div className="about-section">
          <h2>How It Works</h2>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Case Registration</h3>
              <p>Register new cases with detailed information including clues, evidence, and victim details</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Clue Analysis</h3>
              <p>Our system analyzes clues and matches them against existing case database</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Suspect Identification</h3>
              <p>Identify potential suspects based on case similarities and patterns</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Threat Assessment</h3>
              <p>Automatic threat level evaluation to prioritize critical cases</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>Key Capabilities</h2>
          <ul className="capabilities-list">
            <li>✓ Intelligent clue matching algorithm</li>
            <li>✓ Comprehensive case file storage</li>
            <li>✓ Real-time case status tracking</li>
            <li>✓ Automated threat level assessment</li>
            <li>✓ Suspect pattern recognition</li>
            <li>✓ Secure role-based access control</li>
            <li>✓ Evidence management system</li>
            <li>✓ Investigation timeline tracking</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
