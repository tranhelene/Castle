"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { watchUserScore } from "../firebase/initializeDatabase";
import "../tasks/tasks.css";

const CurrentLevel = ({ maxValue }) => {
	const [score, setScore] = useState(0);
	const { user } = useAuth();

	useEffect(() => {
		let unsubscribe;

		if (user) {
			try {
				// Set up the listener
				unsubscribe = watchUserScore(user.uid, (newScore) => {
					setScore(newScore);
					console.log(newScore);
				});
			} catch (err) {
				setError(err.message);
			}
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [user]);

	let level = Math.floor(score / maxValue);

	return <div className="flex items-center text-black text-2xl">Lv. {level}</div>;
};

export default CurrentLevel;
