import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import "../styles/Admin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Check if logged-in user is in the "admins" list in Firebase
  const checkAdmin = async (uid) => {
    try {
      const snapshot = await get(ref(db, "admins/" + uid));
      return snapshot.exists();
    } catch (err) {
      console.error("Error checking admin:", err);
      return false;
    }
  };

  // ✅ Email + Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = await checkAdmin(userCredential.user.uid);

      if (isAdmin) {
        navigate("/admin/dashboard", { replace: true }); // instant redirect
      } else {
        setError("You are not authorized as admin.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isAdmin = await checkAdmin(user.uid);

      if (isAdmin) {
        navigate("/admin/dashboard", { replace: true }); // instant redirect
      } else {
        setError("You are not authorized as admin.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>Admin Login</h2>

        {/* Email + Password Login Form */}
        <form onSubmit={handleEmailLogin} className="admin-login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        <div className="divider">or</div>

        {/* Google Sign-In */}
        <button onClick={handleGoogleLogin} className="btn-google">
          Sign in with Google
        </button>

        {/* Error Message */}
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
}
