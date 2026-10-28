import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if all critical Firebase environment variables are provided
export const isFirebaseConfigured = () => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "your_api_key_here" &&
    firebaseConfig.projectId &&
    firebaseConfig.projectId !== "your_project_id"
  );
};

let app = null;
let auth = null;
let db = null;
let storage = null;

if (isFirebaseConfigured()) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    try {
      storage = getStorage(app);
    } catch {
      console.warn("Firebase Storage initialization skipped.");
    }
  } catch (err) {
    console.error("Firebase initialization failed, falling back to Demo Mode:", err);
  }
}

export { app, auth, db, storage };
