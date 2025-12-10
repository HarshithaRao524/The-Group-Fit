// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";   // ✅ Import functions

const firebaseConfig = {
  apiKey: "AIzaSyD3VhidnYaBDV_E6WICl0PYEgO-WzkotUk",
  authDomain: "the-group-fit-firebase.firebaseapp.com",
  projectId: "the-group-fit-firebase",
  storageBucket: "the-group-fit-firebase.appspot.com",
  messagingSenderId: "258362312319",
  appId: "1:258362312319:web:0f7f1095d938d1e20ce14a",
  databaseURL:
    "https://the-group-fit-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/" // ✅ Added here instead of inside getDatabase
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getDatabase(app);          // ✅ Correct and cleaner
export const storage = getStorage(app);

// ⭐ THIS WAS MISSING
export const functions = getFunctions(app);   // ✅ Now BookNow.jsx will not crash
