// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
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

// Your web app's Firebase configuration
const firebaseConfigStorage = {
  apiKey: process.env.FIREBASE_API_KEY_STORAGE,
  authDomain: "beatmood-cb291.firebaseapp.com",
  projectId: "beatmood-cb291",
  storageBucket: "beatmood-cb291.appspot.com",
  messagingSenderId: "965592386826",
  appId: "1:965592386826:web:cfc3c830835619b419bef3"
};

// Initialize Firebase
const appStorage = initializeApp(firebaseConfigStorage);

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'storageApp');
export const db = getFirestore(app);
export const storage = getStorage(appStorage);