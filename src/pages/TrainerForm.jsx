import React, { useState, useEffect } from "react";
import { ref, set, get, update } from "firebase/database";
import { db } from "../firebase";

export default function TrainerForm({ trainerId = null }) {
  const [trainer, setTrainer] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
  });

  const [message, setMessage] = useState("");

  // If editing an existing trainer, fetch details
  useEffect(() => {
    const fetchTrainer = async () => {
      if (trainerId) {
        const snapshot = await get(ref(db, `trainers/${trainerId}`));
        if (snapshot.exists()) {
          setTrainer(snapshot.val());
        }
      }
    };
    fetchTrainer();
  }, [trainerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (trainerId) {
        // Update existing trainer
        await update(ref(db, `trainers/${trainerId}`), trainer);
        setMessage("Trainer updated successfully!");
      } else {
        // Add new trainer
        const newId = Date.now().toString(); // simple unique ID
        await set(ref(db, `trainers/${newId}`), trainer);
        setMessage("Trainer added successfully!");
        setTrainer({ name: "", email: "", specialization: "", experience: "" });
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="trainer-form">
      <h3>{trainerId ? "Edit Trainer" : "Add Trainer"}</h3>
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={trainer.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={trainer.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization (Yoga/Zumba etc.)"
          value={trainer.specialization}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={trainer.experience}
          onChange={handleChange}
          required
        />
        <button type="submit">{trainerId ? "Update Trainer" : "Add Trainer"}</button>
      </form>
    </div>
  );
}
