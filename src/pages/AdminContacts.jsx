// src/pages/AdminContacts.jsx
import React, { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "../firebase";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const contactsRef = ref(db, "contacts");
    // listen for changes
    const unsubscribe = onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        setContacts([]);
        setLoading(false);
        return;
      }
      // convert object to array
      const arr = Object.keys(data).map((key) => ({
        id: key,
        ...data[key]
      })).sort((a,b)=> b.createdAt - a.createdAt); // newest first
      setContacts(arr);
      setLoading(false);
    }, (err) => {
      console.error("Failed to read contacts:", err);
      setLoading(false);
    });

    // cleanup
    return () => {
      off(contactsRef);
    };
  }, []);

  return (
    <div className="admin-contacts-page">
      <h2>Contact Messages</h2>

      {loading ? <p>Loading...</p> : null}

      {contacts.length === 0 && !loading ? (
        <p>No contact messages yet.</p>
      ) : (
        <table className="admin-contacts-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Message</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
