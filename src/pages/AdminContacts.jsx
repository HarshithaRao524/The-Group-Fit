// src/pages/AdminContacts.jsx
import React, { useEffect, useState } from "react";
import { ref, onValue, off, remove } from "firebase/database";
import { db } from "../firebase";
import "../styles/admin.css";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contactsRef = ref(db, "contacts");

    onValue(
      contactsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (!data) {
          setContacts([]);
          setLoading(false);
          return;
        }

        const arr = Object.entries(data)
          .map(([id, value]) => ({ id, ...value }))
          .sort((a, b) => b.createdAt - a.createdAt);

        setContacts(arr);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to read contacts:", err);
        setLoading(false);
      }
    );

    return () => off(contactsRef);
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this message?"
    );
    if (!confirm) return;

    try {
      await remove(ref(db, `contacts/${id}`));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete message");
    }
  };

  return (
    <div className="admin-contacts-page">
      <h2>Contact Messages</h2>

      {loading && <p>Loading...</p>}

      {!loading && contacts.length === 0 && (
        <p>No contact messages yet.</p>
      )}

      {!loading && contacts.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.contact}</td>
                <td style={{ whiteSpace: "pre-wrap" }}>{c.message}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
