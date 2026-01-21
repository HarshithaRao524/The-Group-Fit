// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { ref, push, onValue, query, orderByChild } from "firebase/database";
import { Star } from "lucide-react";

// Service ordering
const adultOrder = [
  "Yoga",
  "Dance Fitness",
  "Contemporary Dance",
  "Freestyle Dance",
  "Calisthenics",
  "Pilates",
];

const kidsOrder = ["Yoga", "Gymnastics", "Contemporary", "Freestyle", "Hip Hop"];

const Home = () => {
  const navigate = useNavigate();

  // Services state
  const [adultClasses, setAdultClasses] = useState([]);
  const [kidsClasses, setKidsClasses] = useState([]);

  // Reviews state
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [googleReviews, setGoogleReviews] = useState([]);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  // Flash popup
const [showPopup, setShowPopup] = useState(false);

// Show popup after 5 seconds
useEffect(() => {
  const timer = setTimeout(() => {
    setShowPopup(true);
  }, 5000);

  return () => clearTimeout(timer);
}, []);

  // ✅ ADDED: Restore login state after refresh
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch services (Live updates)
  useEffect(() => {
    const servicesRef = ref(db, "services");

    onValue(servicesRef, (snap) => {
      if (!snap.exists()) return;

      const data = snap.val();

      const adults = adultOrder
        .map((key) => data.adults?.[key])
        .filter((cls) => cls && cls.active);

      const kids = kidsOrder
        .map((key) => data.kids?.[key])
        .filter((cls) => cls && cls.active);

      setAdultClasses(adults);
      setKidsClasses(kids);
    });
  }, []);

  // Fetch reviews (firebase + google reviews) (Live updates)
  useEffect(() => {
    const reviewRef = query(ref(db, "reviews"), orderByChild("timestamp"));
    onValue(reviewRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.values(data)
          .filter((r) => !r.hidden)
          .sort((a, b) => b.timestamp - a.timestamp);
        setReviews(arr);
      } else {
        setReviews([]);
      }
    });

    const googleRef = ref(db, "googleReviews");
    onValue(googleRef, (snapshot) => {
      const data = snapshot.val();
      setGoogleReviews(data ? Object.values(data) : []);
    });
  }, []);

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  // Login
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => setUser(res.user))
      .catch(console.error);
  };

  // Logout
  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  // Submit review
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!rating || !comment.trim()) {
      alert("Please give a rating and comment");
      return;
    }

    const newReview = {
      name: user.displayName,
      photo: user.photoURL || "",
      rating,
      comment,
      timestamp: Date.now(),
      hidden: false,
    };

    push(ref(db, "reviews"), newReview);

    // ❌ REMOVED: setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
  };

  return (
    <div className="home-wrapper">
      {/* 🔥 FLASH POPUP */}
{showPopup && (
  <div className="flash-popup-overlay">
    <div className="flash-popup fancy-popup">
      <button
        className="popup-close"
        onClick={() => setShowPopup(false)}
      >
        ✕
      </button>

      <span className="popup-badge">New</span>

      <h3>Trainer Joining Open!</h3>

      <p className="popup-price">
        ₹1000 <span>/ Dance Fitness Session</span>
      </p>

      <p className="popup-subtext">
        Passionate about dance fitness? Join our growing trainer team today.
      </p>

      <button
        className="popup-call-btn"
        onClick={() => navigate("/booknow")}
      >
        Join Now
      </button>
    </div>
  </div>
)}

      {/* --------------------- HERO SECTION --------------------- */}
      <section className="hero-section">
        <div className="hero-slideshow">
          <div className="slide slide1" />
          <div className="slide slide2" />
          <div className="slide slide3" />
          <div className="slide slide4" />
          <div className="slide slide5" />
          <div className="slide slide6" />
          <div className="slide slide7" />
          <div className="slide slide8" />
        </div>

        <div className="hero-overlay" />

        <div className="hero-content">
          <h1 className="hero-title">
            &quot;Fitness is not a destination, it&apos;s a way of life&quot;
          </h1>

          <p className="hero-subtitle">
            At Group-Fit we provide fitness for all ages online and offline!
            <br />
            Yoga, Dance Fitness, Gymnastics and Athletic classes.
            <br />
            Join us on the journey to a healthier and happier you!!
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/groupfit.social?igsh=MXBvenRzNWk0c2M2YQ==",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Connect with us on Instagram
            </button>
          </div>

          <div className="hero-trainer-cta">
            <p>
              Want to join our classes as a <strong>member</strong> or{" "}
              <strong>trainer</strong>?
            </p>
            <button
              className="link-button"
              onClick={() => navigate("/booknow")}
            >
              Click here to Register
            </button>
          </div>
        </div>
      </section>

      {/* --------- Yoga Teacher Training preview (glimpse) --------- */}
      <section className="ytt-preview">
        <div className="ytt-preview-text">
          <h2>Become a Certified Yoga Teacher</h2>
          <p>
            We are soon launching a 200-hour Yoga Teacher Training program (RYT)
            at The GroupFit. Deepen your practice, understand yoga beyond
            asanas and learn how to guide others safely and confidently.
          </p>
          <button
            className="ytt-preview-btn"
            onClick={() => navigate("/yoga-teacher-training")}
          >
            Know more about 200hr YTT
          </button>
        </div>
      </section>

      {/* ------------------------- SERVICES SECTION -------------------------- */}
      <section className="services-section">
        <h2>Our Classes</h2>

        <div className="section-block">
          <h3>Adults</h3>
          <div className="class-grid">
            {adultClasses.map((cls, idx) => (
              <div key={idx} className="class-card">
                <img src={cls.img} alt={cls.name} />
                <h4>{cls.name}</h4>
                <p>{cls.desc}</p>

                {cls.name === "Yoga" && (
                  <button
                    className="ytt-small-link"
                    onClick={() => navigate("/yoga-teacher-training")}
                  >
                    Learn about Yoga Teacher Training
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="section-block">
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

        <p
        className="contact-text"
        onClick={() => navigate("/contact")}
        style={{ cursor: "pointer" }}
        >
          Contact us if you want to start classes in your society.
          </p>
          <button
          className="contact-box-btn"
          onClick={() => navigate("/contact")}
          >
            Contact Us
            </button>

      </section>

      {/* ------------------------- REVIEWS SECTION -------------------------- */}
      <section className="reviews-section">
        <h2 className="reviews-title">Feedback</h2>

        {googleReviews.length > 0 && (
          <div className="reviews-list">
            <h3>Google Reviews</h3>
            {googleReviews.map((review, idx) => (
              <div key={idx} className="review-card">
                <div className="profile-initials">
                  {getInitials(review.name)}
                </div>
                <div className="review-content">
                  <h4>{review.name}</h4>
                  <div className="rating">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={16} color="#555" fill="#555" />
                    ))}
                  </div>
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="reviews-list">
          <h3>Trainer Feedback</h3>

          {reviews.length === 0 && <p>No feedbacks yet.</p>}

          {reviews.map((review, idx) => (
            <div key={idx} className="review-card">
              {review.photo ? (
                <img
                  src={review.photo}
                  alt={review.name}
                  className="profile-pic"
                />
              ) : (
                <div className="profile-initials">
                  {getInitials(review.name)}
                </div>
              )}
              <div className="review-content">
                <h4>{review.name}</h4>
                <div className="rating">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={16} color="#555" fill="#555" />
                  ))}
                </div>
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        {!user ? (
          <div className="login-section">
            <p className="login-text">Sign in to submit your feedback</p>
            <button onClick={handleLogin}>Login with Google</button>
          </div>
        ) : (
          <div className="review-form-section">
            <div className="user-info">
              <span>{user.displayName}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>

            <form className="review-form" onSubmit={handleSubmitReview}>
              <div className="rate-us">
                <span>Rate us:</span>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    color="#333"
                    fill={i < (hoverRating || rating) ? "#333" : "none"}
                    onClick={() => setRating(i + 1)}
                    onMouseEnter={() => setHoverRating(i + 1)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="star"
                  />
                ))}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
              ></textarea>

              <button type="submit">Submit Feedback</button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
