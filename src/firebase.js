import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DM,
  projectId: "m20k-a87bd",
  storageBucket: process.env.REACT_APP_STG_BCKT,
  messagingSenderId: "316254124103",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-GWX93KM921",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// const auth = getAuth(firebaseApp);
// const provider = GoogleAuthProvider();
// const provider = new GoogleAuthProvider();

// export { auth };
export default db;
