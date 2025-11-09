import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYFtxXouu-dkBiDlS_uPGA-FZUMlka24o",
  authDomain: "herohome-8c1d7.firebaseapp.com",
  projectId: "herohome-8c1d7",
  storageBucket: "herohome-8c1d7.firebasestorage.app",
  messagingSenderId: "1049536917345",
  appId: "1:1049536917345:web:dfcf3665538cd540955f20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)