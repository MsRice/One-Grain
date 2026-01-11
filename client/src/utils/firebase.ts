import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYX7PGUtialuGVU_IR_dP9khICmeVax1Y",
  authDomain: "one-grain.firebaseapp.com",
  projectId: "one-grain",
  storageBucket: "one-grain.firebasestorage.app",
  messagingSenderId: "60479781620",
  appId: "1:60479781620:web:62e1ad6565023334eebca1",
  measurementId: "G-5DBFC7X5HS",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);