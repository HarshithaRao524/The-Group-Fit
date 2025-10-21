import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD3VhidnYaBDV_E6WICl0PYEgO-WzkotUk",
  authDomain: "the-group-fit-firebase.firebaseapp.com",
  projectId: "the-group-fit-firebase",
  storageBucket: "the-group-fit-firebase.firebasestorage.app",
  messagingSenderId: "258362312319",
  appId: "1:258362312319:web:0f7f1095d938d1e20ce14a"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(
  app,
  "https://the-group-fit-firebase-default-rtdb.asia-southeast1.firebasedatabase.app/"
);
