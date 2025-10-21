// src/pages/BookingsPage.jsx
import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const snapshot = await get(ref(db, "bookings"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setBookings(list);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div>
      <h3>User Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Society</th>
              <th>Class</th>
              <th>Schedule</th>
              <th>Classes/Week</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.fullName}</td>
                <td>{b.contact}</td>
                <td>{b.email}</td>
                <td>{b.society || b.otherSociety}</td>
                <td>{b.selectedClass}</td>
                <td>{b.schedule}</td>
                <td>{b.classesPerWeek}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
