import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-4d95e.firebaseapp.com",
  projectId: "genwebai-4d95e",
  storageBucket: "genwebai-4d95e.firebasestorage.app",
  messagingSenderId: "605085031740",
  appId: "1:605085031740:web:617233c292113e01bcd239",
  measurementId: "G-94E9CDKFK3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export { auth, provider };