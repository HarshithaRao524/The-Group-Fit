// functions/index.js

const { onRequest, onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const Razorpay = require("razorpay");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK (for Realtime DB access)
admin.initializeApp();

// Limit number of containers and set region
setGlobalOptions({ region: "us-central1", maxInstances: 10 });

// ---------- RAZORPAY SETUP ----------
// ⚠️ TEST KEYS ONLY (do not use live keys here yet)
const razorpay = new Razorpay({
  key_id: "rzp_test_Roh1wL445GvdaD",       // e.g. rzp_test_XXXX
  key_secret: "A8cd4LEFAhxdXHzxp8JEaPQ3",
});

// ---------- CREATE RAZORPAY ORDER (HTTP + CORS) ----------

exports.createRazorpayOrder = onRequest((req, res) => {
  cors(req, res, async () => {
    // Handle preflight
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    if (req.method !== "POST") {
      res.status(405).send({ error: "Method not allowed" });
      return;
    }

    try {
      const { amount, bookingId } = req.body;

      if (!amount || !bookingId) {
        res
          .status(400)
          .send({ error: "amount and bookingId are required" });
        return;
      }

      const options = {
        amount: amount * 100, // rupees -> paise
        currency: "INR",
        receipt: bookingId,
      };

      const order = await razorpay.orders.create(options);

      res.status(200).send({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      });
    } catch (err) {
      console.error("Error in createRazorpayOrder:", err);
      res.status(500).send({ error: "Unable to create Razorpay order" });
    }
  });
});

// ---------- CONFIRM BOOKING (CALLABLE) ----------

exports.confirmBooking = onCall(async (request) => {
  const data = request.data || {};
  const {
    bookingId,
    paymentId,
    orderId,
    email,
    phone,
    userName,
    classInfo,
  } = data;

  if (!bookingId || !paymentId || !orderId) {
    throw new HttpsError(
      "invalid-argument",
      "bookingId, paymentId and orderId are required"
    );
  }

  try {
    const db = admin.database();
    const bookingRef = db.ref("bookings").child(bookingId);

    await bookingRef.update({
      status: "confirmed",
      paymentId,
      orderId,
      confirmedAt: Date.now(),
    });

    console.log(
      "Booking confirmed:",
      bookingId,
      "for",
      userName,
      "class:",
      classInfo,
      "email:",
      email,
      "phone:",
      phone
    );

    return {
      success: true,
      message: "Booking confirmed and payment details saved.",
    };
  } catch (err) {
    console.error("Error in confirmBooking:", err);
    throw new HttpsError(
      "internal",
      "Failed to update booking in database"
    );
  }
});
