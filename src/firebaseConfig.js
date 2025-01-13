import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvALZbQq7gXQeHFfF2F6lTVY1GLU3NJPg",
  authDomain: "testfirebase-fb6f0.firebaseapp.com",
  projectId: "testfirebase-fb6f0",
  storageBucket: "testfirebase-fb6f0.appspot.com",
  messagingSenderId: "793195002745",
  appId: "1:793195002745:web:83e4b082652bea7bca8da8"
};

// Inicialitza Firebase
const app = initializeApp(firebaseConfig);

// Exporta Firestore
export const db = getFirestore(app);