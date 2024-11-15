"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { watchUserScore, watchUserCastle, setUserCastle } from "../firebase/initializeDatabase";

const CastleShopItem = ({ imagePath = "/api/placeholder/200/200", name = "Castle Name", price = 0 }) => {
	const [displayCastle, setDisplayCastle] = useState("");
	const [score, setScore] = useState(0);
	const { user } = useAuth();

	useEffect(() => {
		let unsubscribe1;
		let unsubscribe2;

		if (user) {
			try {
				// Set up the listener
				unsubscribe1 = watchUserScore(user.uid, (newScore) => {
					setScore(newScore);
					console.log(newScore);
				});
				unsubscribe2 = watchUserCastle(user.uid, (newCastle) => {
					setDisplayCastle(newCastle);
				});
			} catch (err) {
				setError(err.message);
			}
		}

		return () => {
			if (unsubscribe1) {
				unsubscribe1();
			}
			if (unsubscribe2) {
				unsubscribe2();
			}
		};
	}, [user]);

	const level = Math.floor(price / 20);

	return (
		<div
			className={`w-36 h-36 rounded-lg shadow-md overflow-hidden transition-transform  ${
				level > Math.floor(score / 20) ? "opacity-50 hover:cursor-not-allowed" : "hover:scale-105 hover:cursor-pointer"
			}
            ${displayCastle === imagePath ? " bg-green-600/25" : "bg-white"}`}
			onClick={() => {
				if (level <= Math.floor(score / 20)) {
					setUserCastle(user, imagePath);
					console.log("Purchased");
				}
			}}
		>
			{/* SVG container - reduced height to 32 (128px) to leave room for text */}
			<div className="w-full h-24 flex items-center justify-center p-3">
				<img src={imagePath} alt={name} className="w-full h-full object-contain" />
			</div>

			<div className="p-2">
				<h3 className="font-medium text-sm truncate text-black">{name}</h3>
				<p className="text-sm font-bold text-green-600">Level {level.toLocaleString()}</p>
			</div>
		</div>
	);
};

export default CastleShopItem;
