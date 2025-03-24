// firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBVc1Jnh4ETwvASEQhluvw9gy5pYH3CIlc",
  authDomain: "freetez-c475d.firebaseapp.com",
  projectId: "freetez-c475d",
  storageBucket: "freetez-c475d.appspot.com",
  messagingSenderId: "142421038646",
  appId: "1:142421038646:web:24988cc3d9fa1cd3546a97",
};

// Initialize Firebase only if it hasn't been initialized already
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with the app instance
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };