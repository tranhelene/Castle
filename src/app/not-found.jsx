const NotFound = () => {
	return (
		<div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
			<div className="text-center space-y-6 max-w-lg">
				{/* Animated Icon */}
				{/* <div className="animate-bounce">
					<Leaf className="w-24 h-24 mx-auto text-green-500" />
				</div> */}

				{/* Error Message */}
				<h1 className="text-8xl font-bold text-green-600">404</h1>

				{/* Description */}
				<div className="space-y-4">
					<h2 className="text-2xl font-semibold text-green-800">Oops! Page Not Found</h2>
					<p className="text-green-700">Looks like you&apos;ve wandered into uncharted territory. The page you&apos;re looking for has gone on an adventure without us.</p>
				</div>

				{/* Back Home Button */}
				<button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2">
					<span>Return Home</span>
				</button>

				{/* Decorative Elements */}
				<div className="absolute top-0 left-0 w-24 h-24 bg-green-200 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
				<div className="absolute bottom-0 right-0 w-32 h-32 bg-green-300 rounded-full opacity-20 translate-x-1/2 translate-y-1/2" />
			</div>
		</div>
	);
};

export default NotFound;
