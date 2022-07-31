import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp( {
  apiKey: "AIzaSyCvlwNhLDUO_IuFFbl0wa4QTJCKWsszWcU",
  authDomain: "smilemass-6902d.firebaseapp.com",
  projectId: "smilemass-6902d",
  storageBucket: "smilemass-6902d.appspot.com",
  messagingSenderId: "592962324011",
  appId: "1:592962324011:web:1a4eb05c087c6fcc730c6e",
  measurementId: "G-HZ396JK36Y"
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);