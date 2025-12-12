// src/pages/AdminDashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/Admin.css";

/**
 * AdminDashboard: layout for admin pages.
 * Nested admin routes (declared in App.jsx) will render into <Outlet />.
 */
export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <div className="admin-main">
        <AdminHeader />
        <div className="admin-content">
          {/* Nested admin routes render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
