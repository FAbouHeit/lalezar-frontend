// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOnRAIBxkBJubbaVgYZ_XE1oVu_92pMEY",
  authDomain: "lalezarspices-aaced.firebaseapp.com",
  projectId: "lalezarspices-aaced",
  storageBucket: "lalezarspices-aaced.appspot.com",
  messagingSenderId: "424075577411",
  appId: "1:424075577411:web:0a77caeb11a274f9752cf6",
  measurementId: "G-YZSPDR1DN2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);