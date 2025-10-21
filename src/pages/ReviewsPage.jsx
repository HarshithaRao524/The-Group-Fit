// src/pages/ReviewsPage.jsx
import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const snapshot = await get(ref(db, "reviews"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setReviews(list);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div>
      <h3>User Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.rating}</td>
                <td>{r.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
