// src/pages/YogaTeacherTraining.jsx
import React from "react";
import "../styles/YogaTeacherTraining.css";

const YogaTeacherTraining = () => {
  return (
    <div className="ytt-wrapper">
      {/* Top hero section */}
      <section className="ytt-hero">
        <div className="ytt-hero-content">
          <h1>200-Hour Yoga Teacher Training (RYT)</h1>
          <p>
            The GroupFit will soon launch a structured 200-hour Yoga Teacher Training
            program to help you become a confident, certified yoga instructor.
          </p>
          <p>
            Designed for serious practitioners, this course blends traditional
            yogic wisdom with modern teaching methods.
          </p>
        </div>
      </section>

      {/* What is 200hr RYT */}
      <section className="ytt-section">
        <h2>What is a 200-hour RYT certification?</h2>
        <p>
          A 200-hour Registered Yoga Teacher (RYT) is a globally recognised
          qualification that shows you have completed a foundational yoga
          teacher training. It covers yoga philosophy, asanas, anatomy,
          sequencing, class management and ethics.
        </p>
      </section>

      {/* Highlights */}
      <section className="ytt-section ytt-grid">
        <div className="ytt-card">
          <h3>Course Highlights</h3>
          <ul>
            <li>Strong foundation in Hatha & Vinyasa based practices</li>
            <li>Detailed posture breakdowns & alignments</li>
            <li>Pranayama, meditation & relaxation techniques</li>
            <li>Yoga philosophy & lifestyle</li>
            <li>Teaching practice & feedback sessions</li>
            <li>Basic anatomy & injury prevention</li>
          </ul>
        </div>

        <div className="ytt-card">
          <h3>Who is this for?</h3>
          <ul>
            <li>Students who want to teach yoga professionally</li>
            <li>Regular practitioners who want deeper understanding</li>
            <li>Fitness trainers who wish to add yoga to their profile</li>
            <li>Anyone committed to a disciplined 200-hour journey</li>
          </ul>
        </div>
      </section>

      {/* Format / schedule – you can fill later */}
      <section className="ytt-section">
        <h2>Format & Schedule</h2>
        <p>
          We are finalising batch dates, format (weekend / intensive) and fee
          structure. Details will be updated soon.
        </p>
        <p>
          If you are interested, leave your details through our{" "}
          <a href="/contact">Contact</a> page or the <a href="/booknow">Book Now</a>{" "}
          page and mention “Yoga Teacher Training (200hr)” in the message.
        </p>
      </section>

      {/* CTA */}
      <section className="ytt-section ytt-cta">
        <h2>Want to get notified when we launch?</h2>
        <p>
          Share your interest and we’ll reach out with batch dates, syllabus and
          early-bird offers.
        </p>
        <div className="ytt-cta-buttons">
          <a href="/contact" className="ytt-btn">
            Contact Us
          </a>
          <a href="/booknow" className="ytt-btn ytt-btn-outline">
            Book Now / Enquire
          </a>
        </div>
      </section>
    </div>
  );
};

export default YogaTeacherTraining;
