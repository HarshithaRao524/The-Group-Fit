// src/pages/TrainersPage.jsx
import React, { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../firebase";
import "../styles/admin.css";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const trainersRef = ref(db, "trainers");

    const unsubscribe = onValue(trainersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        const trainersList = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));

        setTrainers(trainersList);
      } else {
        setTrainers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🗑 Delete trainer
  const handleDelete = async (trainerId, trainerName) => {
    if (
      window.confirm(
        `Are you sure you want to delete trainer "${trainerName}"?`
      )
    ) {
      try {
        await remove(ref(db, `trainers/${trainerId}`));
        alert(`Trainer "${trainerName}" deleted successfully!`);
      } catch (error) {
        console.error("Error deleting trainer:", error);
        alert("Failed to delete trainer. Try again.");
      }
    }
  };

  return (
    <div className="trainers-page">
      <h2>Registered Trainers</h2>

      {trainers.length > 0 ? (
        <div className="table-container">
          <table className="trainers-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Full Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Experience</th>
                <th>Availability</th>
                <th>Bio</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.id}>
                  {/* 📸 PHOTO */}
                  <td>
                    {trainer.photoUrl ? (
                      <img
                        src={trainer.photoUrl}
                        alt={trainer.fullName}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "—"
                    )}
                  </td>

                  <td>{trainer.fullName || "—"}</td>
                  <td>{trainer.contact || "—"}</td>
                  <td>{trainer.email || "—"}</td>
                  <td>{trainer.specialization || "—"}</td>
                  <td>{trainer.experience || "—"}</td>

                  {/* ✅ Correct availability fields */}
                  <td>
                    {trainer.availabilityType
                      ? `${trainer.availabilityType} ${
                          trainer.availabilityTime || ""
                        }`
                      : "—"}
                  </td>

                  {/* ✅ Correct bio field */}
                  <td>{trainer.shortBio || "—"}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(trainer.id, trainer.fullName)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No trainers registered yet.</p>
      )}
    </div>
  );
}
