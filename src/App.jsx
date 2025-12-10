// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import BookNow from "./pages/BookNow";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import FAQs from "./pages/FAQs";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardHome from "./pages/DashboardHome";
import TrainersPage from "./pages/TrainersPage";
import BookingsPage from "./pages/BookingsPage";
import ReviewsPage from "./pages/ReviewsPage";
import AdminServices from "./pages/AdminServices";
import ProtectedRoute from "./components/ProtectedRoute";

// NEW PAGES
import BookNextClass from "./pages/BookNextClass";
import YogaTeacherTraining from "./pages/YogaTeacherTraining";

function App() {
  return (
    <Router>
      {/* App container ensures full height layout */}
      <div className="app-container">
        <Navbar />

        {/* Content area grows to push footer down */}
        <main className="main-content">
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Home />} />
            <Route path="/booknow" element={<BookNow />} />
            <Route path="/book-next-class" element={<BookNextClass />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/TermsConditions" element={<TermsConditions />} />
            <Route path="/faqs" element={<FAQs />} />

            {/* NEW: Yoga Teacher Training public page */}
            <Route
              path="/yoga-teacher-training"
              element={<YogaTeacherTraining />}
            />

            {/* Admin login */}
            <Route path="/admin" element={<AdminLogin />} />

            {/* Admin dashboard + nested routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardHome />} />
              <Route path="trainers" element={<TrainersPage />} />
              <Route path="bookings" element={<BookingsPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="services" element={<AdminServices />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
