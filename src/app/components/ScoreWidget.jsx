"use client";

import { Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { watchUserScore } from "../firebase/initializeDatabase";

const ScoreWidget = () => {
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

	return (
		<div className="fixed top-4 right-4 flex items-center gap-2 bg-green-600/50 text-white px-4 py-2 rounded-full shadow-lg border border-yellow-500/20 backdrop-blur-sm">
			<Coins className="w-5 h-5 text-yellow-400" />
			<span className="font-bold">Score: {score.toLocaleString()}</span>
		</div>
	);
};

export default ScoreWidget;
