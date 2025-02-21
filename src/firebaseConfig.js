// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA0DVnRlQrPyeOe3br7m603YRQW5LbCSS4",
    authDomain: "devra-a0221.firebaseapp.com",
    projectId: "devra-a0221",
    storageBucket: "devra-a0221.firebasestorage.app",
    messagingSenderId: "219832255987",
    appId: "1:219832255987:web:440e531cde5c65277b7e86"
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

  export { db, storage, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, auth, signInWithGoogle, logout };


