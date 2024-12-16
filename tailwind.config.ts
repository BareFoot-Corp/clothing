/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: '0.5rem',
  			md: 'calc(0.5rem - 2px)',
  			sm: 'calc(0.5rem - 4px)'
  		},
		screens: {
			"4xl": "1920px" 
		}
  	},
	  letterSpacing: {
		tightest: '-.075em',
		tighter: '-.05em',
		tight: '-.025em',
		normal: '0',
		wide: '0.05em',
		wider: '.1em',
		widest: '.3em',
	  }
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
