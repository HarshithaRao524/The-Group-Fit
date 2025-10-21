// src/admin/DashboardHome.jsx
import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";
import "../styles/admin.css";

export default function DashboardHome() {
  const [stats, setStats] = useState({
    trainers: 0,
    bookings: 0,
    reviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const trainersSnap = await get(ref(db, "trainers"));
        const bookingsSnap = await get(ref(db, "bookings"));
        const reviewsSnap = await get(ref(db, "reviews"));

        setStats({
          trainers: trainersSnap.exists() ? Object.keys(trainersSnap.val()).length : 0,
          bookings: bookingsSnap.exists() ? Object.keys(bookingsSnap.val()).length : 0,
          reviews: reviewsSnap.exists() ? Object.keys(reviewsSnap.val()).length : 0,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-home">
      <h3>Dashboard Overview</h3>
      <div className="cards">
        <div className="card">
          <h4>Trainers</h4>
          <p>{stats.trainers}</p>
        </div>
        <div className="card">
          <h4>Bookings</h4>
          <p>{stats.bookings}</p>
        </div>
        <div className="card">
          <h4>Reviews</h4>
          <p>{stats.reviews}</p>
        </div>
      </div>
    </div>
  );
}
