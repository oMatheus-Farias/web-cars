import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWmheytxjB9s0V7atc1pmqm6SrLkT0lnQ",
  authDomain: "webcars-98413.firebaseapp.com",
  projectId: "webcars-98413",
  storageBucket: "webcars-98413.appspot.com",
  messagingSenderId: "169713943788",
  appId: "1:169713943788:web:b5e342eff169a39cdf91c9"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };