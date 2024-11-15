// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDHXkt-2Vs-HhZvaPkCAkrutC972JPIEFA",
	authDomain: "castle-e7b71.firebaseapp.com",
	projectId: "castle-e7b71",
	storageBucket: "castle-e7b71.firebasestorage.app",
	messagingSenderId: "895578981185",
	appId: "1:895578981185:web:008be2686730764de157c0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

// If you need a default export, export them all as named exports too
export default { app, auth, db };
