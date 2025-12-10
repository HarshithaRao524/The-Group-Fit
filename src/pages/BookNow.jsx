// src/pages/BookNow.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/BookNow.css";

import { db, storage } from "../firebase";
import { ref as dbRef, push, set } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// ----- CONSTANT DATA -----

const AGE_OPTIONS = ["15-25", "26-35", "36-50", "50 and above"];

const SOCIETY_OPTIONS = [
  "Prestige Shantiniketan",
  "Brigade Metropolis",
  "Brigade Cornerstone Utopia",
  "Raja Ritz Avenue",
  "Sunny Side",
  "Urban Forest",
  "Other",
];

const CLASS_TYPE_OPTIONS = ["Personal (1-1)", "Group Class"];

const CLASSES_PER_WEEK_OPTIONS = [1, 2, 3, 4, 5, 6];

const BookNow = () => {
  const [activeForm, setActiveForm] = useState(null);

  // ---------- NEW USER STATE ----------
  const [nuFullName, setNuFullName] = useState("");
  const [nuAge, setNuAge] = useState("");
  const [nuGender, setNuGender] = useState("");
  const [nuContact, setNuContact] = useState("");
  const [nuEmail, setNuEmail] = useState("");
  const [nuCity, setNuCity] = useState("");
  const [nuSociety, setNuSociety] = useState("");
  const [nuOtherSociety, setNuOtherSociety] = useState("");
  const [nuPreferredClass, setNuPreferredClass] = useState("");
  const [nuPreferredTime, setNuPreferredTime] = useState("");
  const [nuClassType, setNuClassType] = useState("");
  const [nuClassesPerWeek, setNuClassesPerWeek] = useState("");
  const [nuMedical, setNuMedical] = useState("");
  const [nuReferral, setNuReferral] = useState("");

  // ---------- TRAINER STATE ----------
  const [trFullName, setTrFullName] = useState("");
  const [trContact, setTrContact] = useState("");
  const [trEmail, setTrEmail] = useState("");
  const [trAddress, setTrAddress] = useState("");
  const [trSpecialization, setTrSpecialization] = useState("");
  const [trExperience, setTrExperience] = useState("");
  const [trAvailabilityType, setTrAvailabilityType] = useState("");
  const [trAvailabilityTime, setTrAvailabilityTime] = useState("");
  const [trCityType, setTrCityType] = useState("");
  const [trCityName, setTrCityName] = useState("");
  const [trShortBio, setTrShortBio] = useState("");
  const [trPhotoFile, setTrPhotoFile] = useState(null);
  const [trResumeFile, setTrResumeFile] = useState(null);

  const handleToggle = (form) => {
    setActiveForm((prev) => (prev === form ? null : form));
  };

  // ----- SUBMIT HANDLERS -----

  // NEW USER REGISTRATION
  const handleNewUserSubmit = async (e) => {
    e.preventDefault();

    const societyFinal = nuSociety === "Other" ? nuOtherSociety : nuSociety;

    const payload = {
      fullName: nuFullName,
      ageRange: nuAge,
      gender: nuGender,
      contact: nuContact,
      email: nuEmail,
      city: nuCity,
      society: societyFinal,
      preferredClass: nuPreferredClass,
      preferredTime: nuPreferredTime,
      classType: nuClassType,
      classesPerWeek: nuClassesPerWeek,
      medical: nuMedical,
      referral: nuReferral,
      createdAt: Date.now(),
    };

    const newRef = push(dbRef(db, "newUsers"));
    await set(newRef, payload);

    alert("Registration submitted!");
  };

  // TRAINER REGISTRATION
  const handleTrainerSubmit = async (e) => {
    e.preventDefault();

    let photoUrl = "";
    let resumeUrl = "";

    if (trPhotoFile) {
      const photoRef = storageRef(
        storage,
        `trainers/photos/${Date.now()}_${trPhotoFile.name}`
      );
      await uploadBytes(photoRef, trPhotoFile);
      photoUrl = await getDownloadURL(photoRef);
    }

    if (trResumeFile) {
      const resumeRef = storageRef(
        storage,
        `trainers/resumes/${Date.now()}_${trResumeFile.name}`
      );
      await uploadBytes(resumeRef, trResumeFile);
      resumeUrl = await getDownloadURL(resumeRef);
    }

    const payload = {
      fullName: trFullName,
      contact: trContact,
      email: trEmail,
      address: trAddress,
      specialization: trSpecialization,
      experience: trExperience,
      availabilityType: trAvailabilityType,
      availabilityTime: trAvailabilityTime,
      cityType: trCityType,
      cityName: trCityType === "Others" ? trCityName : "Bangalore",
      shortBio: trShortBio,
      photoUrl,
      resumeUrl,
      createdAt: Date.now(),
    };

    const newRef = push(dbRef(db, "trainers"));
    await set(newRef, payload);

    alert("Trainer registration submitted!");
  };

  // ----- JSX -----

  return (
    <div className="booknow-container">
      {/* Header Section */}
      <div className="hero-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>Join our community and discover a new path to wellness.</p>
      </div>

      {/* Selection Cards */}
      <div className="cards-wrapper">
        <div className="selection-card">
          <h3>New User Registration</h3>
          <p>Register and begin your wellness journey with us.</p>
          <button onClick={() => handleToggle("newUser")}>
            {activeForm === "newUser" ? "Hide Form" : "Register Now"}
          </button>
        </div>

        <div className="selection-card">
          <h3>Book Next Class</h3>
          <p>Already registered? Continue your fitness journey.</p>

          {/* NEW: open dedicated Book Next Class page */}
          <Link to="/book-next-class">
            <button type="button">Book Now</button>
          </Link>
        </div>

        <div className="selection-card">
          <h3>Trainer Registration</h3>
          <p>Join our team and inspire others to transform.</p>
          <button onClick={() => handleToggle("trainer")}>
            {activeForm === "trainer" ? "Hide Form" : "Become a Trainer"}
          </button>
        </div>
      </div>

      {/* Forms */}
      <div className="form-section">
        {/* ---------- NEW USER FORM ---------- */}
        {activeForm === "newUser" && (
          <div className="form-box">
            <h3>New User Registration Form</h3>
            <form onSubmit={handleNewUserSubmit}>
              <div className="form-row">
                <label>Full Name*</label>
                <input
                  type="text"
                  value={nuFullName}
                  onChange={(e) => setNuFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label>Age Range*</label>
                <select
                  value={nuAge}
                  onChange={(e) => setNuAge(e.target.value)}
                  required
                >
                  <option value="">Select age range</option>
                  {AGE_OPTIONS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label>Gender*</label>
                <div className="inline-options">
                  <label>
                    <input
                      type="radio"
                      value="Male"
                      checked={nuGender === "Male"}
                      onChange={(e) => setNuGender(e.target.value)}
                      required
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Female"
                      checked={nuGender === "Female"}
                      onChange={(e) => setNuGender(e.target.value)}
                      required
                    />
                    Female
                  </label>
                </div>
              </div>

              <div className="form-row">
                <label>Contact / Phone Number*</label>
                <input
                  type="tel"
                  value={nuContact}
                  onChange={(e) => setNuContact(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label>Email ID</label>
                <input
                  type="email"
                  value={nuEmail}
                  onChange={(e) => setNuEmail(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Area / City</label>
                <input
                  type="text"
                  value={nuCity}
                  onChange={(e) => setNuCity(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Name of Society*</label>
                <select
                  value={nuSociety}
                  onChange={(e) => setNuSociety(e.target.value)}
                  required
                >
                  <option value="">Select society</option>
                  {SOCIETY_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {nuSociety === "Other" && (
                  <input
                    type="text"
                    placeholder="Please specify society"
                    value={nuOtherSociety}
                    onChange={(e) => setNuOtherSociety(e.target.value)}
                    style={{ marginTop: "8px" }}
                    required
                  />
                )}
              </div>

              <div className="form-row">
                <label>Preferred Class*</label>
                <input
                  type="text"
                  placeholder="e.g., Adult Yoga / Dance Fitness"
                  value={nuPreferredClass}
                  onChange={(e) => setNuPreferredClass(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label>Preferred Time*</label>
                <input
                  type="text"
                  placeholder="e.g., Mon Wed Fri 7.30am"
                  value={nuPreferredTime}
                  onChange={(e) => setNuPreferredTime(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label>Select Class Type*</label>
                <select
                  value={nuClassType}
                  onChange={(e) => setNuClassType(e.target.value)}
                  required
                >
                  <option value="">Select class type</option>
                  {CLASS_TYPE_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label>No. of Classes per Week*</label>
                <select
                  value={nuClassesPerWeek}
                  onChange={(e) => setNuClassesPerWeek(e.target.value)}
                  required
                >
                  <option value="">Select</option>
                  {CLASSES_PER_WEEK_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <label>Medical Conditions (Optional)</label>
                <textarea
                  value={nuMedical}
                  onChange={(e) => setNuMedical(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Referral (How did you hear about us?)</label>
                <input
                  type="text"
                  value={nuReferral}
                  onChange={(e) => setNuReferral(e.target.value)}
                />
              </div>

              <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="reset" onClick={() => window.location.reload()}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ---------- TRAINER FORM ---------- */}
        {activeForm === "trainer" && (
          <div className="form-box">
            <h3>Trainer Registration Form</h3>
            <form onSubmit={handleTrainerSubmit}>
              <div className="form-row">
                <label>Full Name*</label>
                <input
                  type="text"
                  value={trFullName}
                  onChange={(e) => setTrFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label>Contact Number*</label>
                <input
                  type="tel"
                  value={trContact}
                  onChange={(e) => setTrContact(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label>Email</label>
                <input
                  type="email"
                  value={trEmail}
                  onChange={(e) => setTrEmail(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Current Address</label>
                <input
                  type="text"
                  value={trAddress}
                  onChange={(e) => setTrAddress(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Specialization*</label>
                <input
                  type="text"
                  placeholder="e.g., Yoga, Dance Fitness, Gymnastics"
                  value={trSpecialization}
                  onChange={(e) => setTrSpecialization(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label>Experience / Certifications*</label>
                <input
                  type="text"
                  value={trExperience}
                  onChange={(e) => setTrExperience(e.target.value)}
                  required
                />
              </div>

              <div className="form-row">
                <label>Availability</label>
                <select
                  value={trAvailabilityType}
                  onChange={(e) => setTrAvailabilityType(e.target.value)}
                >
                  <option value="">Select availability</option>
                  <option value="Full time">Full time</option>
                  <option value="Part time">Part time</option>
                  <option value="Freelancer">Freelancer</option>
                </select>
                {(trAvailabilityType === "Part time" ||
                  trAvailabilityType === "Freelancer") && (
                  <input
                    type="text"
                    placeholder="Specify preferred time"
                    value={trAvailabilityTime}
                    onChange={(e) => setTrAvailabilityTime(e.target.value)}
                    style={{ marginTop: "8px" }}
                  />
                )}
              </div>

              <div className="form-row">
                <label>Current City (Optional)</label>
                <select
                  value={trCityType}
                  onChange={(e) => setTrCityType(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Others">Others</option>
                </select>
                {trCityType === "Others" && (
                  <input
                    type="text"
                    placeholder="Mention your city"
                    value={trCityName}
                    onChange={(e) => setTrCityName(e.target.value)}
                    style={{ marginTop: "8px" }}
                  />
                )}
              </div>

              <div className="form-row">
                <label>Short Bio</label>
                <textarea
                  value={trShortBio}
                  onChange={(e) => setTrShortBio(e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setTrPhotoFile(e.target.files[0])}
                />
              </div>

              <div className="form-row">
                <label>Resume and Certificate Upload*</label>
                <input
                  type="file"
                  onChange={(e) => setTrResumeFile(e.target.files[0])}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="reset" onClick={() => window.location.reload()}>
                  Reset
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookNow;
