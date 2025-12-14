import React, { useEffect, useState } from "react";
import { ref, onValue, remove, update } from "firebase/database";
import { db } from "../firebase";  // Assuming your Firebase config is imported
import "../styles/admin.css";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const reviewsRef = ref(db, "reviews");

    // Real-time listener for reviews
    onValue(reviewsRef, (snapshot) => {
      if (!snapshot.exists()) {
        setReviews([]);
        return;
      }

      // Convert reviews from snapshot into an array of objects
      const list = Object.entries(snapshot.val()).map(([id, val]) => ({
        id,
        ...val,
      }));

      // Update state with the new list of reviews
      setReviews(list);
    });
  }, []); // Only run once when the component mounts

  const handleDelete = async (id) => {
    if (window.confirm("Delete permanently?")) {
      await remove(ref(db, `reviews/${id}`));
    }
  };

  const handleToggleHide = async (id, hidden) => {
    await update(ref(db, `reviews/${id}`), { hidden: !hidden });
  };

  return (
    <div className="reviews-table-container">
      <h3>User Reviews</h3>

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
                <button onClick={() => handleToggleHide(r.id, r.hidden)}>
                  {r.hidden ? "Unhide" : "Hide"}
                </button>
                <button onClick={() => handleDelete(r.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
