import React from "react";
import { Link } from "react-router-dom";
import logo from "/logo.jpeg";
import "./Navbar.css"; // import the CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Group-Fit Logo" />
        <span>The Group-Fit</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/register">Register</Link>
        <Link to="/about">About</Link>
        <Link to="/reviews">Review</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
