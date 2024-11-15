"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { createUserDocument } from "../firebase/initializeDatabase";
import "../login/login.css";

const CastleImage = () => {
	return (
		<div className="title">
			<div className="castle">
				<img src="./castle.webp" alt="castle" className="castle castle-image" height="200px" />
			</div>
			<h1>Castle</h1>
		</div>
	);
};

const GoogleSignIn = ({ onSignInSuccess, onSignInError }) => {
	// const handleGoogle = async (e) => {
	// 	const provider = await new GoogleAuthProvider();
	// 	return signInWithPopup(auth, provider);
	// };
	const handleGoogle = async (e) => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);

			const token = await result.user.getIdToken();

			// Set the token as a cookie
			document.cookie = `auth-token=${token}; path=/`;

			// Create/get user document in Firestore
			const userData = await createUserDocument(result.user);

			// Call success callback if provided
			if (onSignInSuccess) {
				onSignInSuccess(userData);
				console.log(userData);
			}
		} catch (error) {
			console.error("Error during Google sign-in:", error);
			if (onSignInError) {
				onSignInError(error);
			}
		}
	};

	return (
		<div>
			<CastleImage />
			<div className="login-button">
				<button onClick={handleGoogle} className="bg-green-600 text-white rounded-2xl p-4">
					Sign In With Google
				</button>
			</div>
		</div>
	);
};

export default GoogleSignIn;
