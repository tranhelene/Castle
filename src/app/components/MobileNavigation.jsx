"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, ClipboardList, Castle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const MobileNavigation = () => {
	const [currentPath, setCurrentPath] = useState("/");
	const router = useRouter();
	const { user } = useAuth();

	const navigation = [
		{ name: "Home", path: "/", icon: Home },
		{ name: "Tasks", path: "/tasks", icon: ClipboardList },
		{ name: "Shop", path: "/shop", icon: Castle },
	];

	const handleNavigation = (path) => {
		setCurrentPath(path);
		router.push(path);
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
			<div className="grid grid-cols-3 h-16">
				{navigation.map((item) => {
					const Icon = item.icon;
					const isActive = currentPath === item.path;

					return (
						<button
							key={item.name}
							onClick={() => handleNavigation(item.path)}
							className={`flex flex-col items-center justify-center space-y-1 ${isActive ? "text-green-600" : "text-gray-600 hover:text-brand"}`}
						>
							<Icon className="h-6 w-6" />
							<span className="text-xs">{item.name}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default MobileNavigation;
