import { NextResponse } from "next/server";

export function middleware(request) {
	// Instead of cookies, we'll check for Firebase auth token in localStorage
	const token = request.cookies.get("auth-token")?.value;

	const protectedPaths = [
		"/tasks",
		"/shop",
		"/login", // add any other protected routes here
	];

	const isProtectedPath = protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path));

	if (isProtectedPath && !token) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/tasks/:path*", "/shop/:path*", "/login/:path*"],
};
