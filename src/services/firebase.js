import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIOAf_8F7qH-njyfr0v6c2blnUJTHHjPE",
  authDomain: "the-brain-8f5e5.firebaseapp.com",
  projectId: "the-brain-8f5e5",
  storageBucket: "the-brain-8f5e5.firebasestorage.app",
  messagingSenderId: "945779611221",
  appId: "1:945779611221:web:28866911215ec4efe9a6dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
