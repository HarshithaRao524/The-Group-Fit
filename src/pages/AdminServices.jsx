// src/pages/AdminServices.jsx
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";
import {
  ref as dbRef,
  set,
  remove,
  onValue,
} from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import "../styles/AdminServices.css";

export default function AdminServices() {
  const [category, setCategory] = useState("adults");
  const [services, setServices] = useState({ adults: {}, kids: {} });

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    active: true,
    image: null,
  });

  // 🔄 Fetch services
  useEffect(() => {
    const servicesRef = dbRef(db, "services");
    onValue(servicesRef, (snap) => {
      if (snap.exists()) {
        setServices(snap.val());
      }
    });
  }, []);

  // ✏️ Handle input
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ➕ Add class
  const handleAddClass = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) {
      alert("Please fill all fields");
      return;
    }

    try {
      // Upload image
      const imgRef = storageRef(
        storage,
        `services/${category}/${Date.now()}_${form.image.name}`
      );
      await uploadBytes(imgRef, form.image);
      const imgURL = await getDownloadURL(imgRef);

      // Save service
      await set(
        dbRef(db, `services/${category}/${form.name}`),
        {
          name: form.name,
          desc: form.desc,
          price: Number(form.price),
          img: imgURL,
          active: form.active,
        }
      );

      setForm({
        name: "",
        desc: "",
        price: "",
        active: true,
        image: null,
      });

      alert("Class added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add class");
    }
  };

  // ❌ Delete class
  const handleDelete = async (cat, name) => {
    if (window.confirm(`Delete "${name}"?`)) {
      await remove(dbRef(db, `services/${cat}/${name}`));
    }
  };

  return (
    <div className="admin-services-page">
      <h2>Manage Classes</h2>

      {/* ➕ ADD FORM */}
      <form className="service-form" onSubmit={handleAddClass}>
        <h3>Add New Class</h3>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="adults">Adults</option>
          <option value="kids">Kids</option>
        </select>

        <input
          type="text"
          name="name"
          placeholder="Class Name"
          value={form.name}
          onChange={handleChange}
        />

        <textarea
          name="desc"
          placeholder="Class Description"
          value={form.desc}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
        />

        {/* ✅ ACTIVE TOGGLE */}
        <div className="active-row">
          <label className="switch">
            <input
              type="checkbox"
              name="active"
              checked={form.active}
              onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
          <span className="active-label">Active</span>
        </div>

        <button type="submit">Add Class</button>
      </form>

      {/* 📋 EXISTING CLASSES */}
      {["adults", "kids"].map((cat) => (
        <div key={cat} className="services-list">
          <h3>{cat.toUpperCase()}</h3>

          <div className="service-grid">
            {services[cat] &&
              Object.values(services[cat]).map((cls) => (
                <div key={cls.name} className="service-card">
                  <img src={cls.img} alt={cls.name} />
                  <h4>{cls.name}</h4>
                  <p>{cls.desc}</p>
                  <p className="price">₹{cls.price}</p>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(cat, cls.name)
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
