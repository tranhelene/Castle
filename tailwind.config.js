/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				brand: {
					DEFAULT: "#00664F", // Default Green
				},
				accent: "#FBBF24",
			},
		},
	},
	plugins: [require("@tailwindcss/aspect-ratio")],
};
