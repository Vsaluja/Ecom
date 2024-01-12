/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ecom-font-bg": "var(--ecom-font-bg)",
        "back-font-col": "var(--back-font-col)",
      },
    },
  },
  plugins: [],
}

