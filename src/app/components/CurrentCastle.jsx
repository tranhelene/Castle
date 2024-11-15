"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { watchUserCastle } from "../firebase/initializeDatabase";

export const CurrentCastle = () => {
	const [displayCastle, setDisplayCastle] = useState("./c1.svg");
	const { user } = useAuth();

	useEffect(() => {
		let unsubscribe;

		if (user) {
			try {
				// Set up the listener
				unsubscribe = watchUserCastle(user.uid, (newCastle) => {
					setDisplayCastle(newCastle);
					console.log(newCastle);
				});
			} catch (err) {
				console.log(err.message);
			}
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [user]);

	return (
		<div>
			<img src={displayCastle} className="w-full h-full object-contain" />
		</div>
	);
};
