// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWneoT3_Hek3w515L86gH77jOSmat99Ds",
  authDomain: "fir-practise-40667.firebaseapp.com",
  projectId: "fir-practise-40667",
  storageBucket: "fir-practise-40667.firebasestorage.app",
  messagingSenderId: "702839338565",
  appId: "1:702839338565:web:dc05d68df9c8eec50b152c",
  measurementId: "G-BP96RVNVVX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);