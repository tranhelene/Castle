// helpers/firebaseUser.js
import { doc, getDoc, setDoc, collection, deleteDoc, onSnapshot, runTransaction } from "firebase/firestore";

import { db } from "./firebaseConfig";

export const createUserDocument = async (user) => {
	if (!user) return null;

	// Reference to the user document
	const userRef = doc(db, "users", user.uid);

	// Check if user document exists
	const userSnap = await getDoc(userRef);

	if (!userSnap.exists()) {
		const userData = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			createdAt: new Date(),
			score: 0,
			currentCastle: "./c1.svg",
		};

		try {
			await setDoc(userRef, userData);
			console.log("New user created in Firestore");
			return userData;
		} catch (error) {
			console.error("Error creating user document:", error);
			throw error;
		}
	}

	return userSnap.data();
};

export const getUserData = async (uid) => {
	if (!uid) return null;

	const userRef = doc(db, "users", uid);
	const userSnap = await getDoc(userRef);

	if (userSnap.exists()) {
		return userSnap.data();
	}

	return null;
};

export const setUserCastle = async (user, castle) => {
	if (!user) return null;

	// Reference to the user's document
	const userRef = doc(db, "users", user.uid);

	// Check if user document exists
	const userSnap = await getDoc(userRef);

	try {
		if (!userSnap.exists()) {
			// If the document doesn't exist, create it with the castle field
			await setDoc(userRef, { currentCastle: castle });
			console.log("Set new castle");
		} else {
			// If the document exists, update the currentCastle field
			await setDoc(userRef, { currentCastle: castle }, { merge: true });
			console.log("Updated castle");
		}
	} catch (error) {
		console.error("Error setting castle:", error);
		throw error;
	}
};

// ADD TODO ITEM
export const addTodoItem = async (user, todoId, todo) => {
	try {
		const userId = user.uid;
		// Input validation
		// if (!todoId || typeof todoId !== "string") {
		// 	throw new Error("Valid todoId is required");
		// }
		// if (!todo || typeof todo !== "object") {
		// 	throw new Error("Valid todo object is required");
		// }

		// Create document reference with the specific ID
		const todoRef = doc(db, "users", userId, "todos", todoId);

		// Set the document with the provided data
		await setDoc(todoRef, todo);

		return todoId;
	} catch (error) {
		console.error("Error adding todo item:", error);
		throw error;
	}
};

// DELETE TODO ITEM
export const deleteTodoItem = async (user, todoId) => {
	try {
		const userId = user.uid;
		// Input validation

		// Create document reference using string parameters
		const todoRef = doc(db, "users", userId, "todos", todoId);

		// Delete the document
		await deleteDoc(todoRef);

		console.log("Todo deleted successfully");
	} catch (error) {
		console.error("Error in deleteTodoItem:", error);
		throw error;
	}
};

export const watchUserTodos = (userId, onUpdate) => {
	try {
		// Create a reference to the user's todos subcollection
		const todosRef = collection(db, "users", userId, "todos");

		// Create a query against the collection
		// const q = query(todosRef, where("userId", "==", userId)); // Remove this line if using subcollection

		// Set up real-time listener
		const unsubscribe = onSnapshot(
			todosRef,
			(snapshot) => {
				const todos = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				onUpdate(todos);
			},
			(error) => {
				console.error("Error in todos listener:", error);
			}
		);

		// Return unsubscribe function
		return unsubscribe;
	} catch (error) {
		console.error("Error setting up todos listener:", error);
		throw new Error("Failed to set up todos listener");
	}
};

export const watchUserScore = (userId, onUpdate) => {
	try {
		// Create a reference to the user's document
		const userDocRef = doc(db, "users", userId);

		// Set up real-time listener
		const unsubscribe = onSnapshot(
			userDocRef,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.data();
					const score = data.score; // Access the `score` field
					onUpdate(score); // Call the onUpdate callback with the score value
				} else {
					console.warn("User document does not exist.");
					onUpdate(null); // Optionally handle non-existent documents
				}
			},
			(error) => {
				console.error("Error in user score listener:", error);
			}
		);

		// Return unsubscribe function
		return unsubscribe;
	} catch (error) {
		console.error("Error setting up user score listener:", error);
		throw new Error("Failed to set up user score listener");
	}
};

export const watchUserCastle = (userId, onUpdate) => {
	try {
		// Create a reference to the user's document
		const userDocRef = doc(db, "users", userId);

		// Set up real-time listener
		const unsubscribe = onSnapshot(
			userDocRef,
			(snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.data();
					const score = data.currentCastle; // Access the `score` field
					onUpdate(score); // Call the onUpdate callback with the score value
				} else {
					console.warn("User document does not exist.");
					onUpdate(null); // Optionally handle non-existent documents
				}
			},
			(error) => {
				console.error("Error in user score listener:", error);
			}
		);

		// Return unsubscribe function
		return unsubscribe;
	} catch (error) {
		console.error("Error setting up user score listener:", error);
		throw new Error("Failed to set up user score listener");
	}
};
// set and get score

export const updateScore = async (userId, amount) => {
	try {
		const userRef = doc(db, "users", userId);

		// Use a transaction to ensure score updates are atomic
		await runTransaction(db, async (transaction) => {
			const userDoc = await transaction.get(userRef);

			if (!userDoc.exists()) {
				throw new Error("User document does not exist!");
			}

			const currentScore = userDoc.data().score || 0;
			const newScore = currentScore + amount;

			// Prevent negative scores if needed
			// const finalScore = Math.max(0, newScore);

			transaction.update(userRef, {
				score: newScore,
			});
		});

		return true;
	} catch (error) {
		console.error("Error updating score:", error);
		throw error;
	}
};

export const getscore = async (uid) => {
	if (!uid) return null;

	const userRef = doc(db, "users", uid);
	const userSnap = await getDoc(userRef);

	if (userSnap.exists()) {
		return userSnap.data().score;
	}

	return null;
};

// set and get level
export const setLevel = async (uid, level) => {
	if (!uid || !level) return null;

	const userRef = doc(db, "users", uid);

	try {
		await setDoc(userRef, { level }, { merge: true });
		return await getUserData(uid);
	} catch (error) {
		console.error("Error updating user document:", error);
		throw error;
	}
};

export const getLevel = async (uid) => {
	if (!uid) return null;

	const userRef = doc(db, "users", uid);
	const userSnap = await getDoc(userRef);

	if (userSnap.exists()) {
		return userSnap.data().level;
	}

	return null;
};

// export const updateUserData = async (uid, data) => {
// 	if (!uid || !data) return null;

// 	const userRef = doc(db, "users", uid);

// 	try {
// 		await setDoc(userRef, data, { merge: true });
// 		return await getUserData(uid);
// 	} catch (error) {
// 		console.error("Error updating user document:", error);
// 		throw error;
// 	}
// };
