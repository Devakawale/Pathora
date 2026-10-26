/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { forest: '#243B35', amber: '#E8B77D', ivory: '#F7F5EF', coral: '#D97768', ink: '#252A28', muted: '#777D78', line: '#E4E1D8' }, fontFamily: { sans: ['Inter', 'Manrope', 'sans-serif'] } } },
  plugins: []
}