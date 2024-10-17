import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAT-FYylXgbENcjKvJMw5yAPhqT4244-08",
  authDomain: "e-commerce-d3f4c.firebaseapp.com",
  projectId: "e-commerce-d3f4c",
  storageBucket: "e-commerce-d3f4c.appspot.com",
  messagingSenderId: "786724805146",
  appId: "1:786724805146:web:342e64a07c0ed7017a4fa3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app); // Firestore initialization

export { app, storage, db };