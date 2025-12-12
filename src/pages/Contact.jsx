// src/pages/Contact.jsx
import React, { useState } from "react";
import "../styles/Contact.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";

// Firebase imports
import { ref, push } from "firebase/database";
import { db } from "../firebase"; // make sure this path matches your project

const initialForm = { name: "", email: "", contact: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    if (!form.name.trim() || !form.email.trim() || !form.contact.trim() || !form.message.trim()) {
      return "Please fill all fields. All fields are mandatory.";
    }
    // basic email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Please enter a valid email.";
    // basic indian phone check (10 digits starting 6-9)
    if (!/^[6-9]\d{9}$/.test(form.contact)) return "Please enter a valid 10-digit phone number.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) {
      setStatus(err);
      return;
    }

    setStatus("Sending...");

    try {
      const contactsRef = ref(db, "contacts");
      // push a new contact message
      await push(contactsRef, {
        name: form.name.trim(),
        email: form.email.trim(),
        contact: form.contact.trim(),
        message: form.message.trim(),
        createdAt: Date.now() // use server timestamp via Cloud Function or server if you prefer
      });

      setStatus("Thanks — your message has been received. We'll get back to you soon!");
      setForm(initialForm);
    } catch (error) {
      console.error("Firebase write failed:", error);
      setStatus("Something went wrong while sending. Please try again.");
    }
  }

  return (
    <div className="contact-container">
      <h2 className="contact-title">Get In Touch With Us</h2>
      <p className="contact-sub">We’d love to hear from you! Reach us anytime.</p>

      {/* FAQs quick access under the heading */}
      <div className="faq-top-row">
        <p className="faq-top-text">Looking for quick answers? You may find them here.</p>
        <Link to="/faqs" className="faq-top-btn">Open FAQs</Link>
      </div>

      <div className="contact-grid">
        {/* Left Form */}
        <div className="contact-form-card">
          <h3 className="card-heading">Send us a message</h3>

          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <label className="input-label">
              <div className="label-top">
                <span className="label-text">Name</span>
                <span className="req">*</span>
              </div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </label>

            <label className="input-label">
              <div className="label-top">
                <span className="label-text">Email</span>
                <span className="req">*</span>
              </div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@domain.com"
                type="email"
                required
              />
            </label>

            <label className="input-label">
              <div className="label-top">
                <span className="label-text">Contact</span>
                <span className="req">*</span>
              </div>
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="10-digit phone number"
                inputMode="tel"
                required
              />
            </label>

            <label className="input-label">
              <div className="label-top">
                <span className="label-text">Message</span>
                <span className="req">*</span>
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                rows={6}
                required
              />
            </label>

            <div className="form-row">
              <button type="submit" className="primary-btn">Send Message</button>
              <button type="button" className="ghost-btn" onClick={() => { setForm(initialForm); setStatus(""); }}>
                Clear
              </button>
            </div>

            {status && <p className="form-status">{status}</p>}

            <div className="faq-row">
              <Link to="/faqs" className="faq-btn">Check FAQs</Link>
            </div>
          </form>
        </div>

        {/* Right Contact Information Card */}
        <div className="contact-card">
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <a href="mailto:thegroupfit@gmail.com">thegroupfit@gmail.com</a>
          </div>

          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <p>95254 88353 / 85499 25411</p>
          </div>

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
    </div>
  );
}
