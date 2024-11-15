"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { watchUserScore } from "../firebase/initializeDatabase";
import "../home.css";

const ProgressBar = ({ maxValue }) => {
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

	let percentage = ((score % 20) / maxValue) * 100;

	return (
		<div className="flex flex-row items-center px-4 gap-4 select-none">
			<span className="whitespace-nowrap font-semibold text-sm w-5 text-black">{percentage}%</span>
			<div className="w-full bg-green-600/50 rounded-full h-5">
				<div className="h-5 rounded-full" style={{ width: `${percentage}%`, backgroundColor: "green" }}></div>
			</div>
		</div>
	);
};

export default ProgressBar;
