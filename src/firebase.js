// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5_1vB1fi1c_SrF1i5YB81we9YC2dPAc4",
  authDomain: "twitter-clone-e441c.firebaseapp.com",
  projectId: "twitter-clone-e441c",
  storageBucket: "twitter-clone-e441c.appspot.com",
  messagingSenderId: "458161236492",
  appId: "1:458161236492:web:6e4f34246d5383bee61c29",
  measurementId: "G-CE48VJT07N",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);

export default firebase;
