// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-matrimonial.firebaseapp.com",
  projectId: "mern-matrimonial",
  storageBucket: "mern-matrimonial.appspot.com",
  messagingSenderId: "528593769554",
  appId: "1:528593769554:web:7439661dfb3653e07f3b8b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);