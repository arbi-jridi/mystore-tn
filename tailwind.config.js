/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./app/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			boxShadow: {
				light: '0px 0px 7px -5px rgba(0, 0, 0, 0.5)',
			},
			screens: {
				xxxl: '1800px',
				muiLg: '1200px',
				muiMd: '900px',
				muiSm: '600px',
				sliderSm: '490px',
				xxs: '329px',
			},
		},
	},
	plugins: [],
};
