// src/admin/AdminSidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Admin.css";

export default function AdminSidebar() {
  const activeClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <aside className="admin-sidebar">
      <h3>Menu</h3>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/dashboard" end className={activeClass}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/dashboard/new-users" className={activeClass}>
              New Users
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/dashboard/trainers" className={activeClass}>
              Trainers
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/dashboard/bookings" className={activeClass}>
              Bookings
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/dashboard/reviews" className={activeClass}>
              Reviews
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/dashboard/services" className={activeClass}>
              Services
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin/dashboard/contacts" className={activeClass}>
              Contact Messages
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
