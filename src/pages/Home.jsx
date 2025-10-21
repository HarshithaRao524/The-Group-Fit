import React from "react";
import "../styles/Home.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        "Fitness is not a destination, it's a way of life"
      </h1>
      <p className="home-description">
        At Group-Fit we provide fitness for all ages online or Offline! <br></br>
        Yoga, Dance Fitness, Gymnastics and Athletic classes. <br></br>
        Join us on the journey to a healthier and happier you!!
      </p>
      <div className="home-cta">
        <a href="https://www.instagram.com/groupfit.social?igsh=MXBvenRzNWk0c2M2YQ==" target="_blank" rel="noopener noreferrer">
          Connect with us on Instagram
        </a>
      </div>
    </div>
  );
};

export default Home;
