// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration (replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyDzu1FEDphHsmEcGxKQ5wad4KjkGoib6Hg",
  authDomain: "easybus-8f2dc.firebaseapp.com",
  projectId: "easybus-8f2dc",
  storageBucket: "easybus-8f2dc.appspot.com", // ✅ FIXED (should end with `.appspot.com`)
  messagingSenderId: "171132193997",
  appId: "1:171132193997:web:36606c624388942f0c6d84",
  measurementId: "G-QEN8ZD0Z0P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase auth
export const auth = getAuth(app);
export default app;
