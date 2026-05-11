
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "exam-notes-ai-a376a.firebaseapp.com",
  projectId: "exam-notes-ai-a376a",
  storageBucket: "exam-notes-ai-a376a.firebasestorage.app",
  messagingSenderId: "184141650362",
  appId: "1:184141650362:web:1f7f587e170d77b619e583"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}