// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ-4HGnUI4e7mZVzDySW1dr7O_PfKLnqA",
  authDomain: "contact-c0e1e.firebaseapp.com",
  projectId: "contact-c0e1e",
  storageBucket: "contact-c0e1e.appspot.com",
  messagingSenderId: "792908252336",
  appId: "1:792908252336:web:f1292b73b061b47b97e775",
  measurementId: "G-CV2SHG3GFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);