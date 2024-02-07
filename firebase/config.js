// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADry6fW5CiO73jcRg1BNuiwp9mnSteBR0",
  authDomain: "kossuthapp-apatok.firebaseapp.com",
  projectId: "kossuthapp-apatok",
  storageBucket: "kossuthapp-apatok.appspot.com",
  messagingSenderId: "1070254194994",
  appId: "1:1070254194994:web:93f2e2a23bcbc1c9a8172b",
  measurementId: "G-5Q8G94VGY1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
