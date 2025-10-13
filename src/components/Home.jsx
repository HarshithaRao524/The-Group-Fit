import React from "react";
import "./Home.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        "Fitness is not a destination, it's a way of life"
      </h1>
      <p className="home-description">
        At Group-Fit we provide fitness for all ages online or Offline! Yoga, Dance Fitness, Gymnastics and Athletic classes. 
        Join us on the journey to a healthier and happier you!!
      </p>
      <div className="home-cta">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          Connect with us on Instagram
        </a>
      </div>
    </div>
  );
};

export default Home;
