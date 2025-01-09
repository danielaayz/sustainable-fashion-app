import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Firebase configuration object containing all required keys and identifiers
const firebaseConfig = {
   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
   storageBucket: "sustainability-fashion-app.firebasestorage.app",
   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
   appId: import.meta.env.VITE_FIREBASE_APP_ID,
   measurementId: "G-H0K9HFX9ZY",
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);
// Initialize Firebase Analytics and export it for use in other parts of the application
export const analytics = getAnalytics(app);
// Initialize Firebase Storage and export it for use in other parts of the application
export const storage = getStorage(app);
