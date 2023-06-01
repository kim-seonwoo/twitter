import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB5_1vB1fi1c_SrF1i5YB81we9YC2dPAc4",
  authDomain: "twitter-clone-e441c.firebaseapp.com",
  projectId: "twitter-clone-e441c",
  storageBucket: "twitter-clone-e441c.appspot.com",
  messagingSenderId: "458161236492",
  appId: "1:458161236492:web:6e4f34246d5383bee61c29",
  measurementId: "G-CE48VJT07N",
};

const app = firebase.initializeApp(firebaseConfig);

export const authService = getAuth(app);

export const firebaseInstance = firebase;
export const dbService = getFirestore(app);
export const storageService = getStorage(app);
