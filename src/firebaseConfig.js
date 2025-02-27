// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut,RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
  // ✅ Ensure these are exported
  

  // Google Sign-in Function
const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  };
  
  // Logout Function
  const logout = () => {
    signOut(auth);
  };

  export { db, storage, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, auth, signInWithGoogle, logout, };


