// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhXIINe2_omFlnUR5twbDaW5_yKl4YsiA",
  authDomain: "carefinder-ff84c.firebaseapp.com",
  projectId: "carefinder-ff84c",
  storageBucket: "carefinder-ff84c.appspot.com",
  messagingSenderId: "129346320840",
  appId: "1:129346320840:web:551a1b83078b7dc106e8fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
