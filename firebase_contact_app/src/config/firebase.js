// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TOD0: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAt5sjlBs-B9vQjX6L3tai38GsFLA5Urp4",
  authDomain: "vite-contact-b79f1.firebaseapp.com",
  projectId: "vite-contact-b79f1",
  storageBucket: "vite-contact-b79f1.appspot.com",
  messagingSenderId: "559353603278",
  appId: "1:559353603278:web:6d716addb1fc386c251c9f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
