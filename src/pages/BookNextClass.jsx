// src/pages/BookNextClass.jsx
import React, { useState, useMemo } from "react";
import "../styles/BookNow.css";

import { db, functions } from "../firebase";
import { ref as dbRef, push, set } from "firebase/database";
import { httpsCallable } from "firebase/functions";

// ---------- CONSTANTS ----------

const SOCIETY_OPTIONS = [
  "Prestige Shantiniketan",
  "Brigade Metropolis",
  "Brigade Cornerstone Utopia",
  "Raja Ritz Avenue",
  "Sunny Side",
  "Urban Forest",
  "Other",
];

const CLASS_OPTIONS_BY_SOCIETY = {
  "Prestige Shantiniketan": [
    { className: "Adult Yoga", schedule: "Mon Wed Fri 7.30am", priceType: "adultYoga" },
    { className: "Adult Yoga", schedule: "Mon Wed Fri 8.45am", priceType: "adultYoga" },
    { className: "Adult Yoga", schedule: "Tue Thu 7.45am", priceType: "adultYoga" },
    { className: "Adult Yoga", schedule: "Tue Thu 8.00pm", priceType: "adultYoga" },
    { className: "Adult Yoga", schedule: "Sat 9.00am", priceType: "adultYoga" },
    { className: "Dance Fitness", schedule: "Mon Wed Fri 7.00pm", priceType: "danceOrKids" },
    { className: "Dance Fitness", schedule: "Tue Thu Fri 8.00am", priceType: "danceOrKids" },
    { className: "Kids Gymnastics", schedule: "Tue Thu 5.00pm", priceType: "danceOrKids" },
    { className: "Kids Gymnastics", schedule: "Sat Sun 10.40am", priceType: "danceOrKids" },
    { className: "Kids Yoga", schedule: "Tue Thu 5.15pm", priceType: "danceOrKids" },
  ],
  "Urban Forest": [
    { className: "Adult Yoga", schedule: "Mon Wed Fri 7.15am", priceType: "adultYoga" },
    { className: "Adult Yoga", schedule: "Mon Wed Fri 8.30am", priceType: "adultYoga" },
  ],
  "Brigade Cornerstone Utopia": [
    { className: "Adult Yoga", schedule: "Tue Thu Fri 8.00am", priceType: "adultYoga" },
  ],
  "Brigade Metropolis": [
    { className: "Adult Yoga", schedule: "Tue Thu 7.40am", priceType: "adultYoga" },
  ],
  "Sunny Side": [
    { className: "Kids Gymnastics", schedule: "Sat Sun 9.00am", priceType: "danceOrKids" },
  ],
  "Raja Ritz Avenue": [
    { className: "Kids Gymnastics", schedule: "Mon Wed 5.00pm", priceType: "danceOrKids" },
    { className: "Kids Gymnastics", schedule: "Sat Sun 10.40am", priceType: "danceOrKids" },
  ],
};

const RATE_PER_TYPE = {
  adultYoga: 250,
  danceOrKids: 299,
};

const CLASSES_PER_WEEK_OPTIONS = [1, 2, 3, 4, 5, 6];

const confirmBookingFnName = "confirmBooking";

const BookNextClass = () => {
  // ---------- EXISTING USER STATE ----------
  const [exUserName, setExUserName] = useState("");
  const [exContact, setExContact] = useState("");
  const [exEmail, setExEmail] = useState("");
  const [exSociety, setExSociety] = useState("");
  const [exClassJson, setExClassJson] = useState("");
  const [exClassesPerWeek, setExClassesPerWeek] = useState("");

  const parsedExClass = useMemo(
    () => (exClassJson ? JSON.parse(exClassJson) : null),
    [exClassJson]
  );

  const exRatePerClass = parsedExClass
    ? RATE_PER_TYPE[parsedExClass.priceType] || 0
    : 0;

  const exTotalAmount =
    exRatePerClass * (exClassesPerWeek ? Number(exClassesPerWeek) : 0);

  // ---------- SUBMIT HANDLER ----------
  const handleExistingUserSubmit = async (e) => {
    e.preventDefault();

    if (!parsedExClass) {
      alert("Please select class and schedule.");
      return;
    }
    if (!exClassesPerWeek) {
      alert("Please select number of classes per week.");
      return;
    }

    const amount = exTotalAmount;

    // 1. Create booking with status "pending"
    const bookingRef = push(dbRef(db, "bookings"));
    const bookingId = bookingRef.key;

    const bookingData = {
      fullName: exUserName,
      contact: exContact,
      email: exEmail,
      society: exSociety,
      selectedClass: parsedExClass.className,
      schedule: parsedExClass.schedule,
      classesPerWeek: exClassesPerWeek,
      amount,
      status: "pending",
      createdAt: Date.now(),
    };

    await set(bookingRef, bookingData);

    // 2. Call backend function to create Razorpay order
    try {
      const response = await fetch(
        "https://us-central1-the-group-fit-firebase.cloudfunctions.net/createRazorpayOrder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, bookingId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { orderId } = data;

      // 3. Open Razorpay checkout
      const options = {
        key: "rzp_test_Roh1wL445GvdaD", // your Test Key ID
        amount: amount * 100,
        currency: "INR",
        name: "The GroupFit",
        description: "Class Booking Payment",
        order_id: orderId,
        prefill: {
          name: exUserName,
          email: exEmail,
          contact: exContact,
        },
        handler: async function (response) {
          const paymentId = response.razorpay_payment_id;

          try {
            const confirmBooking = httpsCallable(functions, confirmBookingFnName);
            const confirmResult = await confirmBooking({
              bookingId,
              paymentId,
              orderId,
              email: exEmail,
              phone: "+91" + exContact,
              userName: exUserName,
              classInfo: `${parsedExClass.className} - ${parsedExClass.schedule}`,
            });
            console.log("confirmBooking result:", confirmResult);
            alert(
              "Payment successful! Confirmation has been sent to your email and mobile."
            );
          } catch (err) {
            console.error("Error in confirmBooking function:", err);
            alert(
              "Payment captured, but there was an issue confirming the booking. Please contact support."
            );
          }
        },
        theme: {
          color: "#ff6b6b",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Payment gateway not loaded. Please refresh and try again.");
      }
    } catch (err) {
      console.error("Error in createRazorpayOrder function:", err);
      alert(
        "Something went wrong while starting the payment. Please try again later."
      );
    }
  };

  return (
    <div className="booknext-page">
      {/* ---------- HERO SECTION ---------- */}
      <section className="booknext-hero">
        <div className="booknext-hero-overlay">
          <div className="brand-chip">
            {/* Replace GF with your logo if you have one */}
            <span className="brand-logo-circle">GF</span>
            <span className="brand-text">The GroupFit</span>
          </div>
          <h1>Book your next class</h1>
          <p>Secure your spot in your favourite batch in just a few clicks.</p>
        </div>
      </section>

      {/* ---------- FORM SECTION ---------- */}
      <section className="booknext-form-section">
        <h2>Class booking details</h2>
        <form className="booknext-form-box" onSubmit={handleExistingUserSubmit}>
          <div className="form-row">
            <label>User Name</label>
            <input
              type="text"
              value={exUserName}
              onChange={(e) => setExUserName(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Contact Number</label>
            <input
              type="tel"
              value={exContact}
              onChange={(e) => setExContact(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Email ID</label>
            <input
              type="email"
              value={exEmail}
              onChange={(e) => setExEmail(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Society*</label>
            <select
              value={exSociety}
              onChange={(e) => {
                setExSociety(e.target.value);
                setExClassJson("");
              }}
              required
            >
              <option value="">Select society</option>
              {SOCIETY_OPTIONS.filter((s) => s !== "Other").map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Select Class & Time*</label>
            <select
              value={exClassJson}
              onChange={(e) => setExClassJson(e.target.value)}
              required
              disabled={!exSociety}
            >
              <option value="">
                {exSociety
                  ? "Select class and schedule"
                  : "Select society first"}
              </option>
              {exSociety &&
                CLASS_OPTIONS_BY_SOCIETY[exSociety]?.map((opt, idx) => (
                  <option key={idx} value={JSON.stringify(opt)}>
                    {opt.className} – {opt.schedule}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-row">
            <label>No. of Classes per Week*</label>
            <select
              value={exClassesPerWeek}
              onChange={(e) => setExClassesPerWeek(e.target.value)}
              required
            >
              <option value="">Select</option>
              {CLASSES_PER_WEEK_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label>Amount (Auto calculated)</label>
            <input
              type="text"
              value={
                exTotalAmount
                  ? `₹ ${exTotalAmount}`
                  : "Amount will be shown after you select class & classes/week"
              }
              readOnly
            />
            {parsedExClass && (
              <small>
                Rate per class: ₹{exRatePerClass} (
                {parsedExClass.priceType === "adultYoga"
                  ? "Adult Yoga"
                  : "Dance Fitness / Kids"}
                )
              </small>
            )}
          </div>

          <div className="form-actions">
            <button type="submit">Pay &amp; Book</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default BookNextClass;
