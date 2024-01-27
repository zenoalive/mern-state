// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_FIREBASE_KEY,
  authDomain: "real-estate-de537.firebaseapp.com",
  projectId: "real-estate-de537",
  storageBucket: "real-estate-de537.appspot.com",
  messagingSenderId: "769042160130",
  appId: "1:769042160130:web:d24697399461fa7e69651b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);