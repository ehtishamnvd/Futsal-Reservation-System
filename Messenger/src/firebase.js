// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUFnWcRnSWkHCj2nEAjcjsqROqPamTgVA",
  authDomain: "futsal-field-a4be5.firebaseapp.com",
  projectId: "futsal-field-a4be5",
  storageBucket: "futsal-field-a4be5.firebasestorage.app",
  messagingSenderId: "656276741925",
  appId: "1:656276741925:web:8e84529fee7a8df3d684cc",
  measurementId: "G-59Q3R1FHNL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, auth, db, storage, analytics };