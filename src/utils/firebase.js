// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB076qRr637-AwcEBy3vtbCviViFFRVBNc",
  authDomain: "netflix-gpt-3a838.firebaseapp.com",
  projectId: "netflix-gpt-3a838",
  storageBucket: "netflix-gpt-3a838.appspot.com",
  messagingSenderId: "479059432591",
  appId: "1:479059432591:web:9aef9c0b6cfaa0e5350cfa",
  measurementId: "G-SYRH7SK6YP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();