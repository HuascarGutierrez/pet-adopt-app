// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pet-adopt-app-191c1.firebaseapp.com",
  projectId: "pet-adopt-app-191c1",
  storageBucket: "pet-adopt-app-191c1.firebasestorage.app",
  messagingSenderId: "573521861434",
  appId: "1:573521861434:web:1f9d5ac4936491de0c0e03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);