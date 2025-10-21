// src/pages/AdminDashboard.jsx
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import DashboardHome from "./DashboardHome";
import TrainersPage from "./TrainersPage";
import BookingsPage from "./BookingsPage";
import ReviewsPage from "./ReviewsPage";
import "../styles/Admin.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <div className="admin-content">
          {/* Use Outlet for nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
