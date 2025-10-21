// src/pages/Register.jsx
import React, { useState } from "react";
import "../styles/Register.css";
import { db } from "../firebase";
import { ref, push } from "firebase/database";

const Register = () => {
  // User Registration state
  const [userData, setUserData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    city: "",
    society: "",
    otherSociety: "",
    selectedClass: "",
    schedule: "",
    classesPerWeek: "",
    medicalNotes: "",
    referral: "",
  });

  // Trainer Registration state
  const [trainerData, setTrainerData] = useState({
    fullName: "",
    contact: "",
    email: "",
    address: "",
    specialization: "",
    experience: "",
    availability: "",
    bio: "",
  });

  // Handle input change for User Registration
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle input change for Trainer Registration
  const handleTrainerChange = (e) => {
    const { name, value } = e.target;
    setTrainerData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit User Registration
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(db, "bookings"), userData);
      alert("User registration submitted successfully!");
      setUserData({
        fullName: "",
        age: "",
        gender: "",
        contact: "",
        email: "",
        city: "",
        society: "",
        otherSociety: "",
        selectedClass: "",
        schedule: "",
        classesPerWeek: "",
        medicalNotes: "",
        referral: "",
      });
    } catch (err) {
      alert("Error submitting user registration: " + err.message);
    }
  };

  // Submit Trainer Registration
  const handleTrainerSubmit = async (e) => {
    e.preventDefault();
    try {
      await push(ref(db, "trainers"), trainerData);
      alert("Trainer registration submitted successfully!");
      setTrainerData({
        fullName: "",
        contact: "",
        email: "",
        address: "",
        specialization: "",
        experience: "",
        availability: "",
        bio: "",
      });
    } catch (err) {
      alert("Error submitting trainer registration: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Ready to Start Your Journey?</h2>
      <p>Join our community and discover a new path to wellness.</p>

      <div className="forms-wrapper">
        {/* User Registration Form */}
        <div className="form-box">
          <h3>User Registration</h3>
          <form onSubmit={handleUserSubmit}>
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={handleUserChange}
              placeholder="Enter your full name"
              required
            />

            <label>Age *</label>
            <select
              name="age"
              value={userData.age}
              onChange={handleUserChange}
              required
            >
              <option value="">Select Age Range</option>
              <option value="5-14">5-14</option>
              <option value="15-25">15-25</option>
              <option value="26-35">26-35</option>
              <option value="36-45">36-45</option>
              <option value="46-55">46-55</option>
              <option value="56+">56 and above</option>
            </select>

            <label>Select Your Gender *</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={userData.gender === "Male"}
                  onChange={handleUserChange}
                  required
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={userData.gender === "Female"}
                  onChange={handleUserChange}
                  required
                />{" "}
                Female
              </label>
            </div>

            <label>Contact Number *</label>
            <input
              type="text"
              name="contact"
              value={userData.contact}
              onChange={handleUserChange}
              placeholder="Enter contact number"
              required
            />

            <label>Email ID</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleUserChange}
              placeholder="Enter email ID"
            />

            <label>City / Area *</label>
            <input
              type="text"
              name="city"
              value={userData.city}
              onChange={handleUserChange}
              placeholder="Enter your city/area"
              required
            />

            <label>Name of Society *</label>
            <select
              name="society"
              value={userData.society}
              onChange={handleUserChange}
              required
            >
              <option value="">Select Society</option>
              <option>Prestige Shantiniketan</option>
              <option>Brigade Metropolis</option>
              <option>Godrej United</option>
              <option>Vaswani Exquisite</option>
              <option>Urban Forest</option>
              <option>Brigade Cornerstone Utopia</option>
              <option>Raja Ritz Avenue</option>
              <option>Brigade Lakefront</option>
              <option>Other</option>
            </select>
            {userData.society === "Other" && (
              <input
                type="text"
                name="otherSociety"
                value={userData.otherSociety}
                onChange={handleUserChange}
                placeholder="Specify your society"
                required
              />
            )}

            <label>Select Class *</label>
            <select
              name="selectedClass"
              value={userData.selectedClass}
              onChange={handleUserChange}
              required
            >
              <option value="">Select Class</option>
              <option>Adult - Yoga</option>
              <option>Adult - Dance Fitness</option>
              <option>Adult - Contemporary Dance</option>
              <option>Adult - Freestyle Dance</option>
              <option>Adult - Calisthenics</option>
              <option>Adult - Pilates</option>
              <option>Children - Yoga</option>
              <option>Children - Gymnastics</option>
              <option>Children - Contemporary</option>
              <option>Children - Freestyle</option>
              <option>Children - Hip Hop</option>
            </select>

            <label>Preferred Batch / Schedule</label>
            <input
              type="text"
              name="schedule"
              value={userData.schedule}
              onChange={handleUserChange}
              placeholder="Enter preferred batch or schedule"
            />

            <label>No of Classes / Week *</label>
            <select
              name="classesPerWeek"
              value={userData.classesPerWeek}
              onChange={handleUserChange}
              required
            >
              <option value="">Select Number</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
            </select>

            <label>Any Medical Conditions or Notes (Optional)</label>
            <textarea
              name="medicalNotes"
              value={userData.medicalNotes}
              onChange={handleUserChange}
              placeholder="Specify if any"
            ></textarea>

            <label>How did you hear about us? (Optional)</label>
            <input
              type="text"
              name="referral"
              value={userData.referral}
              onChange={handleUserChange}
              placeholder="Friend, Instagram, Flyer, etc."
            />

            <button type="submit">Submit</button>
            <button
              type="reset"
              className="reset-btn"
              onClick={() =>
                setUserData({
                  fullName: "",
                  age: "",
                  gender: "",
                  contact: "",
                  email: "",
                  city: "",
                  society: "",
                  otherSociety: "",
                  selectedClass: "",
                  schedule: "",
                  classesPerWeek: "",
                  medicalNotes: "",
                  referral: "",
                })
              }
            >
              Reset
            </button>
          </form>
        </div>

        {/* Trainer Registration Form */}
        <div className="form-box">
          <h3>Trainer Registration</h3>
          <form onSubmit={handleTrainerSubmit}>
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={trainerData.fullName}
              onChange={handleTrainerChange}
              placeholder="Enter full name"
              required
            />

            <label>Contact Number *</label>
            <input
              type="text"
              name="contact"
              value={trainerData.contact}
              onChange={handleTrainerChange}
              placeholder="Enter contact number"
              required
            />

            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={trainerData.email}
              onChange={handleTrainerChange}
              placeholder="Enter email"
              required
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              value={trainerData.address}
              onChange={handleTrainerChange}
              placeholder="Enter address"
            />

            <label>Area of Specialization *</label>
            <input
              type="text"
              name="specialization"
              value={trainerData.specialization}
              onChange={handleTrainerChange}
              placeholder="Yoga, Zumba, etc."
              required
            />

            <label>Years of Experience / Certifications *</label>
            <input
              type="text"
              name="experience"
              value={trainerData.experience}
              onChange={handleTrainerChange}
              placeholder="Enter details"
              required
            />

            <label>Availability / Preferred Time Slots *</label>
            <input
              type="text"
              name="availability"
              value={trainerData.availability}
              onChange={handleTrainerChange}
              placeholder="Enter your availability"
              required
            />

            <label>Short Bio</label>
            <textarea
              name="bio"
              value={trainerData.bio}
              onChange={handleTrainerChange}
              placeholder="Write a short bio"
            ></textarea>

            <button type="submit">Submit</button>
            <button
              type="reset"
              className="reset-btn"
              onClick={() =>
                setTrainerData({
                  fullName: "",
                  contact: "",
                  email: "",
                  address: "",
                  specialization: "",
                  experience: "",
                  availability: "",
                  bio: "",
                })
              }
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
