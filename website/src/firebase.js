import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAyQGXRqPZJWSVa-PQ_P0PWi8XgWNZZixQ",
  authDomain: "transcriptweb-24df2.firebaseapp.com",
  projectId: "transcriptweb-24df2",
  storageBucket: "transcriptweb-24df2.appspot.com",
  messagingSenderId: "944262835563",
  appId: "1:944262835563:web:a7718120782d70a2a4b02e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();