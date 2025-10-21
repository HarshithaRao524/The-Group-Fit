import React from "react";
import "../styles/Services.css";

const Services = () => {
  const adultClasses = [
    { name: "Yoga", img: "/images/YogaAdult.jpg" },
    { name: "Dance Fitness", img: "/images/DanceFitnessAdult.jpg" },
    { name: "Contemporary Dance", img: "/images/ContemporaryDanceAdult.jpg" },
    { name: "Freestyle Dance", img: "/images/FreestyleDanceAdult.jpg" },
    { name: "Calisthenics", img: "/images/CalisthenicsAdult.jpg" },
    { name: "Pilates", img: "/images/PilatesAdult.jpg" },
  ];

  const kidsClasses = [
    { name: "Yoga", img: "/images/YogaKids.jpg" },
    { name: "Gymnastics", img: "/images/GymnasticsKids.jpg" },
    { name: "Contemporary", img: "/images/ContemporaryDanceKids.jpg" },
    { name: "Freestyle", img: "/images/FreestyleDanceKids.jpg" },
    { name: "Hip Hop", img: "/images/HipHopDanceKids.jpg" },
  ];

  return (
    <div className="services-container">
      <h2>Our Classes</h2>

      <div className="section">
        <h3>Adults</h3>
        <div className="class-grid">
          {adultClasses.map((cls, idx) => (
            <div key={idx} className="class-card">
              <img src={cls.img} alt={cls.name} />
              <h4>{cls.name}</h4>
              <p>Description for {cls.name} class...</p>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h3>Kids</h3>
        <div className="class-grid">
          {kidsClasses.map((cls, idx) => (
            <div key={idx} className="class-card">
              <img src={cls.img} alt={cls.name} />
              <h4>{cls.name}</h4>
              <p>Description for {cls.name} class...</p>
            </div>
          ))}
        </div>
      </div>

      <p className="contact-text">
        Contact us if you want to start classes in your society.
      </p>
    </div>
  );
};

export default Services;
