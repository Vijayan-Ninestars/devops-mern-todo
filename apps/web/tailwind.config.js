/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,jsx}'],
	theme: {
		extend: {
			colors: {
				primary: { DEFAULT: '#1F90C8', hover: '#1977A5', light: '#EAF6FD' },
				surface: { background: '#F8FAFC', card: '#FFFFFF' },
				content: { DEFAULT: '#1F2937', secondary: '#6B7280' },
				border: { DEFAULT: '#E5E7EB' },
				success: '#22C55E',
				danger: '#EF4444',
			},
			fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
			boxShadow: { card: '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.06)' },
		},
	},
	plugins: [],
};
