// src/pages/TrainerForm.jsx
import React, { useState, useEffect } from "react";
import { ref, get, update, push } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";

export default function TrainerForm({ trainerId = null }) {
  const [trainer, setTrainer] = useState({
    fullName: "",
    contact: "",
    email: "",
    specialization: "",
    experience: "",
    availabilityType: "",
    availabilityTime: "",
    cityName: "",
    shortBio: "",
    photoUrl: ""
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [message, setMessage] = useState("");

  // 🔄 Fetch existing trainer if editing
  useEffect(() => {
    if (!trainerId) return;

    const fetchTrainer = async () => {
      const snapshot = await get(ref(db, `trainers/${trainerId}`));
      if (snapshot.exists()) {
        setTrainer(snapshot.val());
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
      let photoUrl = trainer.photoUrl;

      // 📸 Upload new photo if selected
      if (photoFile) {
        const imgRef = storageRef(
          storage,
          `trainers/photos/${Date.now()}_${photoFile.name}`
        );
        await uploadBytes(imgRef, photoFile);
        photoUrl = await getDownloadURL(imgRef);
      }

      const payload = {
        ...trainer,
        photoUrl,
        updatedAt: Date.now()
      };

      if (trainerId) {
        await update(ref(db, `trainers/${trainerId}`), payload);
        setMessage("Trainer updated successfully");
      } else {
        await push(ref(db, "trainers"), {
          ...payload,
          createdAt: Date.now()
        });
        setMessage("Trainer added successfully");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="trainer-form">
      <h3>{trainerId ? "Edit Trainer" : "Add Trainer"}</h3>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" value={trainer.fullName} onChange={handleChange} required />
        <input name="contact" placeholder="Contact" value={trainer.contact} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={trainer.email} onChange={handleChange} />
        <input name="specialization" placeholder="Specialization" value={trainer.specialization} onChange={handleChange} required />
        <input name="experience" placeholder="Experience" value={trainer.experience} onChange={handleChange} />
        <input name="availabilityType" placeholder="Availability Type" value={trainer.availabilityType} onChange={handleChange} />
        <input name="availabilityTime" placeholder="Availability Time" value={trainer.availabilityTime} onChange={handleChange} />
        <input name="cityName" placeholder="City" value={trainer.cityName} onChange={handleChange} />
        <textarea name="shortBio" placeholder="Short Bio" value={trainer.shortBio} onChange={handleChange} />

        {/* 📸 Photo Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPhotoFile(e.target.files[0])}
        />

        {trainer.photoUrl && (
          <img
            src={trainer.photoUrl}
            alt="Trainer"
            style={{ width: "80px", marginTop: "10px" }}
          />
        )}

        <button type="submit">
          {trainerId ? "Update Trainer" : "Add Trainer"}
        </button>
      </form>
    </div>
  );
}
