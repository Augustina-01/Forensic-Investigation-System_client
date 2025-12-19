import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Forensic Investigation System</h3>
          <p>Advanced case management and investigation platform</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>Email: info@forensic-system.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Emergency: 911</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Forensic Investigation System. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;