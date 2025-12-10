import React from "react";
import "../styles/Contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Get In Touch With Us</h2>
      <p className="contact-sub">We’d love to hear from you! Reach us anytime.</p>

      <div className="contact-card">

        {/* Email */}
        <div className="contact-item">
          <FaEnvelope className="contact-icon" />
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=thegroupfit@gmail.com&su=Inquiry%20from%20GroupFit%20Website"
            target="_blank"
            rel="noopener noreferrer"
          >
            thegroupfit@gmail.com
          </a>
        </div>

        {/* Phone */}
        <div className="contact-item">
          <FaPhoneAlt className="contact-icon" />
          <p>95254 88353 / 85499 25411</p>
        </div>

        {/* WhatsApp */}
        <div className="contact-item">
          <FaWhatsapp className="contact-icon" />
          <a
            href="https://wa.me/919525488353?text=Hi%20GroupFit!%20I%20would%20like%20to%20know%20more%20about%20your%20classes."
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Address */}
        <div className="contact-item">
          <FaMapMarkerAlt className="contact-icon" />
          <p>
            Prestige Shantiniketan, <br />
            ITPL Main Rd, Thigalarapalya, <br />
            Whitefield, Bengaluru, Karnataka 560048
          </p>
        </div>

      </div>
    </div>
  );
};

export default Contact;
