// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaDj7MJ974TPeah62mw85GE6-zaKxP4_c",
  authDomain: "futsal-field-reservation.firebaseapp.com",
  projectId: "futsal-field-reservation",
  storageBucket: "futsal-field-reservation.appspot.com",
  messagingSenderId: "1020710132153",
  appId: "1:1020710132153:web:c20c02c666245db8273e68",
  measurementId: "G-1R2R4L9YY9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
