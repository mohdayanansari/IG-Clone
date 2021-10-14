// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBk_MRdLCNrdTN4TsglM11OuHuhpYMjaMA",
  authDomain: "ig-clone-5765f.firebaseapp.com",
  projectId: "ig-clone-5765f",
  storageBucket: "ig-clone-5765f.appspot.com",
  messagingSenderId: "184726752565",
  appId: "1:184726752565:web:8b83f11e5144e7e6c1d07c",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
