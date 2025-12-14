import React, { useEffect, useState } from "react";
import { ref, onValue, remove } from "firebase/database";
import { db } from "../firebase";
import "../styles/admin.css";

export default function NewUsers() {
  const [users, setUsers] = useState([]);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    const usersRef = ref(db, "newUsers");

    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (!snapshot.exists()) {
        setUsers([]);
        return;
      }

      const data = snapshot.val();
      const list = Object.entries(data)
        .map(([id, value]) => ({
          id,
          ...value,
        }))
        .sort((a, b) => b.createdAt - a.createdAt);

      setUsers(list);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this registration?")) {
      await remove(ref(db, `newUsers/${id}`));
    }
  };

  return (
    <div className="admin-page">
      <h2>New User Registrations</h2>

      {users.length === 0 ? (
        <p>No new users yet.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Society</th>
              <th>Preferred Class</th>
              <th>Class Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <React.Fragment key={u.id}>
                <tr>
                  <td>{u.fullName}</td>
                  <td>{u.contact}</td>
                  <td>{u.society}</td>
                  <td>{u.preferredClass}</td>
                  <td>{u.classType}</td>
                  <td>
                    <button
                      className="btn-view"
                      onClick={() =>
                        setOpenId(openId === u.id ? null : u.id)
                      }
                    >
                      {openId === u.id ? "Hide" : "View"}
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {openId === u.id && (
                  <tr className="details-row">
                    <td colSpan="6">
                      <div className="details-box">
                        <p><strong>Age Range:</strong> {u.ageRange}</p>
                        <p><strong>Gender:</strong> {u.gender}</p>
                        <p><strong>Email:</strong> {u.email || "—"}</p>
                        <p><strong>City:</strong> {u.city || "—"}</p>
                        <p><strong>Preferred Time:</strong> {u.preferredTime}</p>
                        <p><strong>Classes / Week:</strong> {u.classesPerWeek}</p>
                        <p><strong>Medical Conditions:</strong> {u.medical || "None"}</p>
                        <p><strong>Referral:</strong> {u.referral || "—"}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
