// src/pages/ReviewsPage.jsx
import React, { useEffect, useState } from "react";
import { ref, get, remove, update } from "firebase/database";
import { db } from "../firebase";
import "../styles/Admin.css";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const snapshot = await get(ref(db, "reviews"));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const list = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setReviews(list);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Delete review permanently
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review permanently?")) {
      await remove(ref(db, `reviews/${id}`));
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  // Hide/Unhide review
  const handleToggleHide = async (id, currentHidden) => {
    await update(ref(db, `reviews/${id}`), { hidden: !currentHidden });
    setReviews(
      reviews.map((r) =>
        r.id === id ? { ...r, hidden: !currentHidden } : r
      )
    );
  };

  return (
    <div className="reviews-table-container">
      <h3>User Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <table className="reviews-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className={r.hidden ? "hidden-review" : ""}>
                <td>{r.name}</td>
                <td>{r.rating}</td>
                <td>{r.comment}</td>
                <td>
                  <button
                    className="btn-hide"
                    onClick={() => handleToggleHide(r.id, r.hidden)}
                  >
                    {r.hidden ? "Unhide" : "Hide"}
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(r.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
