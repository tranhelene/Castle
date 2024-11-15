"use client";

import { useAuth } from "../context/AuthContext";
import MobileNavigation from "./MobileNavigation";
import ScoreWidget from "./ScoreWidget";

const ToggleAuthenticated = () => {
	const { user } = useAuth();

	return user ? (
		<div>
			<MobileNavigation />
			<ScoreWidget />
		</div>
	) : null;
};

export default ToggleAuthenticated;
