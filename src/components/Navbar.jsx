import React from "react";
import { Link } from "react-router-dom";
import logo from "/logo.jpeg";
import "../styles/Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Group-Fit Logo" />
        <span>The GroupFit</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/booknow">Book Now</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
