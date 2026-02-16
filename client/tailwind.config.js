/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agentDark: "#0f172a",
        agentBlue: "#3b82f6",
      }
    },
  },
  plugins: [],
}