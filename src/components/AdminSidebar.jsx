// src/admin/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Admin.css";

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h3>Menu</h3>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/dashboard" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/trainers">Trainers</NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/bookings">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard/reviews">Reviews</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
