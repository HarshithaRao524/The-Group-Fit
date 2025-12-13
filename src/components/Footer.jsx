import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-left">© 2025 The Group-Fit. All rights reserved.</p>
        <div className="footer-right">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/TermsConditions">Terms and Conditions</Link>
          <Link to="/FAQs">FAQs</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
