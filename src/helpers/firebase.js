import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYml3yPoQ1t2Y-XSdpEdSptiltQFEUdB8",
  authDomain: "portal-katalabs.firebaseapp.com",
  projectId: "portal-katalabs",
  storageBucket: "portal-katalabs.appspot.com",
  messagingSenderId: "261446066056",
  appId: "1:261446066056:web:b00cddce9fe58133a1243d",
  measurementId: "G-TGSB87BND6"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
export { auth, firestore };