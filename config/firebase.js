// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUHqBxA6i3ASuL5VEQUYBNLLeiYrTGP24",
  authDomain: "chat-4d52a.firebaseapp.com",
  projectId: "chat-4d52a",
  storageBucket: "chat-4d52a.appspot.com",
  messagingSenderId: "463602448805",
  appId: "1:463602448805:web:fb112c8289e6c73f7d504c",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
