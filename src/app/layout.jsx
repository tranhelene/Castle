import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import ToggleAuthenticated from "./components/ToggleAuthenticated";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>
					<ToggleAuthenticated />
					<div>{children}</div>
				</AuthProvider>
			</body>
		</html>
	);
}
