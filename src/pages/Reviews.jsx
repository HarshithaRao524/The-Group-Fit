// src/Reviews.jsx
import React, { useState, useEffect } from "react";
import { auth, provider, db } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { ref, push, onValue, query, orderByChild } from "firebase/database";
import { Star } from "lucide-react";
import "../styles/Reviews.css";

const Reviews = () => {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  // Fetch reviews on load
  useEffect(() => {
    const reviewsRef = query(ref(db, "reviews"), orderByChild("timestamp"));
    onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reviewsArray = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
        setReviews(reviewsArray);
      } else {
        setReviews([]);
      }
    });
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => setUser(result.user))
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((err) => console.error(err));
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide rating and comment");
      return;
    }

    const newReview = {
      name: user.displayName,
      photo: user.photoURL || "",
      rating,
      comment,
      timestamp: Date.now(),
    };

    const reviewsRef = ref(db, "reviews");
    push(reviewsRef, newReview);

    // Show review immediately
    setReviews([newReview, ...reviews]);

    setRating(0);
    setHoverRating(0);
    setComment("");
  };

  return (
    <div className="reviews-container">
      {!user ? (
        <div className="login-section">
          <p className="login-text">Sign in to submit your review</p>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      ) : (
        <div className="review-form-section">
          <div className="user-info">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="profile-pic" />
            ) : (
              <div className="profile-initials">{getInitials(user.displayName)}</div>
            )}
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

            <label>
              Comment:
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
              ></textarea>
            </label>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}

      <div className="reviews-list">
        <h3>User Reviews</h3>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            {review.photo ? (
              <img src={review.photo} alt={review.name} className="profile-pic" />
            ) : (
              <div className="profile-initials">{getInitials(review.name)}</div>
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
    </div>
  );
};

export default Reviews;
