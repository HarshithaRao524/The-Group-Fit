// src/pages/BookingsPage.jsx
import React, { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "../firebase";
import "../styles/admin.css";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookingsRef = ref(db, "bookings");

    const unsubscribe = onValue(
      bookingsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setBookings([]);
          setLoading(false);
          return;
        }

        const list = Object.entries(data)
          .map(([id, value]) => ({
            id,
            ...value,
          }))
          .sort((a, b) => b.createdAt - a.createdAt); // newest first

        setBookings(list);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load bookings:", err);
        setLoading(false);
      }
    );

    return () => off(bookingsRef);
  }, []);

  return (
    <div className="admin-page">
      <h3>User Bookings</h3>

      {loading && <p>Loading bookings...</p>}

      {!loading && bookings.length === 0 && (
        <p>No bookings yet.</p>
      )}

      {!loading && bookings.length > 0 && (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Society</th>
                <th>Category</th>
                <th>Class</th>
                <th>Schedule</th>
                <th>Classes / Week</th>
                <th>Amount (₹)</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{new Date(b.createdAt).toLocaleString()}</td>
                  <td>{b.fullName}</td>
                  <td>{b.contact}</td>
                  <td>{b.email || "—"}</td>
                  <td>{b.society || b.otherSociety || "—"}</td>
                  <td>{b.selectedCategory || "—"}</td>
                  <td>{b.selectedClass}</td>
                  <td>{b.schedule}</td>
                  <td>{b.classesPerWeek}</td>
                  <td>{b.amount ?? "—"}</td>
                  <td>
                    <span
                      className={
                        b.paymentStatus === "paid"
                          ? "status-paid"
                          : "status-unpaid"
                      }
                    >
                      {b.paymentStatus || "pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
