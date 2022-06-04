import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwumEcaJxcta7LBdAe_cMvDuBQZbbn9t0",
  authDomain: "cardsy-75e45.firebaseapp.com",
  projectId: "cardsy-75e45",
  storageBucket: "cardsy-75e45.appspot.com",
  messagingSenderId: "450574866357",
  appId: "1:450574866357:web:9ef7029d89278df8fb2bfc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
