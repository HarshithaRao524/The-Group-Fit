// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  provider,
} from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Watch login state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdmin(user || null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // ✅ Google login
  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Email-password login
  const loginWithEmail = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Optional: Create new admin (for first setup)
  const registerAdmin = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        error,
        loginWithGoogle,
        loginWithEmail,
        registerAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
