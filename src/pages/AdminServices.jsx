import React, { useEffect, useState } from "react";
import "../styles/Services.css";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

const adultOrder = [
  "Yoga",
  "Dance Fitness",
  "Contemporary Dance",
  "Freestyle Dance",
  "Calisthenics",
  "Pilates",
];

const kidsOrder = [
  "Yoga",
  "Gymnastics",
  "Contemporary",
  "Freestyle",
  "Hip Hop",
];

const Services = () => {
  const [adultClasses, setAdultClasses] = useState([]);
  const [kidsClasses, setKidsClasses] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const snapshot = await get(ref(db, "services"));
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Map classes in the correct order
        const orderedAdults = adultOrder
          .map((key) => data.adults[key])
          .filter(Boolean); // remove undefined if some class is missing
        const orderedKids = kidsOrder
          .map((key) => data.kids[key])
          .filter(Boolean);

        setAdultClasses(orderedAdults);
        setKidsClasses(orderedKids);
      }
    };
    fetchServices();
  }, []);

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
              <p>{cls.desc}</p>
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
              <p>{cls.desc}</p>
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
