import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyC4JSvpvy0mF9FoA0ccohojadsBzblrUYU",
  authDomain: "fir-learning-a58da.firebaseapp.com",
  projectId: "fir-learning-a58da",
  storageBucket: "fir-learning-a58da.appspot.com",
  messagingSenderId: "471829557671",
  appId: "1:471829557671:web:532413209452912cd70682"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)

export const storage = getStorage(app)