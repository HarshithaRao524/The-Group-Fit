import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { updatePassword, updateEmail } from "firebase/auth";
import { ref, get, update } from "firebase/database";

export default function AdminSettings() {
  const [adminData, setAdminData] = useState({ email: "", name: "" });
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch admin profile data from Realtime DB
  useEffect(() => {
    const fetchAdmin = async () => {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const snapshot = await get(ref(db, `admins/${uid}`));
        if (snapshot.exists()) {
          setAdminData(snapshot.val());
          setNewEmail(snapshot.val().email || "");
        }
      }
    };
    fetchAdmin();
  }, []);

  // Update email
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    try {
      if (auth.currentUser) {
        await updateEmail(auth.currentUser, newEmail);
        await update(ref(db, `admins/${auth.currentUser.uid}`), { email: newEmail });
        setAdminData((prev) => ({ ...prev, email: newEmail }));
        setMessage("Email updated successfully!");
      }
    } catch (err) {
      setMessage("Error updating email: " + err.message);
    }
  };

  // Update password
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        setNewPassword("");
        setMessage("Password updated successfully!");
      }
    } catch (err) {
      setMessage("Error updating password: " + err.message);
    }
  };

  return (
    <div className="admin-settings">
      <h3>Admin Settings</h3>
      {message && <p style={{ color: "green" }}>{message}</p>}

      <div className="settings-section">
        <h4>Profile Info</h4>
        <p><strong>Name:</strong> {adminData.name}</p>
        <p><strong>Email:</strong> {adminData.email}</p>
      </div>

      <div className="settings-section">
        <h4>Update Email</h4>
        <form onSubmit={handleEmailUpdate}>
          <input
            type="email"
            placeholder="New Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
          <button type="submit">Update Email</button>
        </form>
      </div>

      <div className="settings-section">
        <h4>Update Password</h4>
        <form onSubmit={handlePasswordUpdate}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>
      </div>
    </div>
  );
}
