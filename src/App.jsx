import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

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
import AdminContacts from "./pages/AdminContacts";
import ProtectedRoute from "./components/ProtectedRoute";

import BookNextClass from "./pages/BookNextClass";
import YogaTeacherTraining from "./pages/YogaTeacherTraining";
import NewUsers from "./pages/NewUsers";

function App() {
  const location = useLocation();

  // 🔑 Hide Navbar/Footer for admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="app-container">
      {!isAdminRoute && <Navbar />}

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

          {/* Yoga Teacher Training */}
          <Route
            path="/yoga-teacher-training"
            element={<YogaTeacherTraining />}
          />

          {/* Admin login */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Admin dashboard (protected + nested) */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            {/* ✅ DEFAULT ADMIN PAGE */}
            <Route index element={<DashboardHome />} />

            {/* Admin pages */}
            <Route path="new-users" element={<NewUsers />} />
            <Route path="trainers" element={<TrainersPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="contacts" element={<AdminContacts />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
