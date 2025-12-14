// src/pages/AdminDashboard.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/admin.css";

/**
 * AdminDashboard
 * Layout wrapper for all admin routes.
 * Access control is handled by <ProtectedRoute /> in App.jsx
 */
export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      {/* Left sidebar navigation */}
      <AdminSidebar />

      {/* Right main area */}
      <div className="admin-main">
        {/* Top header */}
        <AdminHeader />

        {/* Page content (nested routes) */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
