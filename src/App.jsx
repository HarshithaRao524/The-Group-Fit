// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardHome from "./pages/DashboardHome";
import TrainersPage from "./pages/TrainersPage";
import BookingsPage from "./pages/BookingsPage";
import ReviewsPage from "./pages/ReviewsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/reviews" element={<Reviews />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested admin dashboard routes */}
          <Route index element={<DashboardHome />} />
          <Route path="trainers" element={<TrainersPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
