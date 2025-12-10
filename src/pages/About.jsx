import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="about-title">About The GroupFit</h2>

        <p className="about-text">
          At <strong>The GroupFit</strong>, we believe fitness is not just a routine — it is a lifestyle.
          Our mission is to create an uplifting fitness community where everyone,
          from beginners to advanced athletes, can train in a supportive and motivating atmosphere.
        </p>

        <p className="about-text">
          Our certified trainers bring personalized attention to every session —
          whether you choose online or in-studio classes. From strength and mobility training
          to dance and wellness routines, we are here to help you become the healthiest,
          happiest version of yourself.
        </p>

        <div className="about-highlights">
          <div className="highlight-box">
            🧘‍♀️ <span>Holistic Fitness Approach</span>
          </div>
          <div className="highlight-box">
            🏋️‍♂️ <span>Certified & Experienced Trainers</span>
          </div>
          <div className="highlight-box">
            👥 <span>Community-Driven Environment</span>
          </div>
          <div className="highlight-box">
            💻 <span>Online & In-Studio Classes</span>
          </div>
        </div>
      </div>

      <div className="about-image-section">
        <img
          src="/images/Fitness studio.jpg"
          alt="Group fitness"
          className="about-image"
        />
      </div>
    </div>
  );
};

export default About;
