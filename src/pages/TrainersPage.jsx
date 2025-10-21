// src/pages/TrainersPage.jsx
import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      const snapshot = await get(ref(db, "trainers"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
        setTrainers(list);
      }
    };
    fetchTrainers();
  }, []);

  return (
    <div>
      <h3>Trainer Registrations</h3>
      {trainers.length === 0 ? (
        <p>No trainers registered yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {trainers.map((t) => (
              <tr key={t.id}>
                <td>{t.fullName}</td>
                <td>{t.contact}</td>
                <td>{t.email}</td>
                <td>{t.specialization}</td>
                <td>{t.experience}</td>
                <td>{t.availability}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
