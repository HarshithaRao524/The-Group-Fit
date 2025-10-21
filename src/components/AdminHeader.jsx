// src/admin/AdminHeader.jsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Admin.css";

export default function AdminHeader() {
  const { logout } = useAuth();

  return (
    <header className="admin-header">
      <h2>Admin Dashboard</h2>
      <button className="btn-logout" onClick={logout}>
        Logout
      </button>
    </header>
  );
}
