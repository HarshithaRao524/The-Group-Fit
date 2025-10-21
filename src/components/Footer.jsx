import React from "react";
import "../styles/Footer.css"; // Make sure to create Footer.css

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-left">© 2025 The Group-Fit. All rights reserved.</p>
        <div className="footer-right">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms and Conditions</a>
          <a href="/faqs">FAQs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
