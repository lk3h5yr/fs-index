/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        fs: {
          navy: '#1e3a5f',
          muted: '#f4f6f8',
        },
      },
      boxShadow: {
        'fs-card': '0 18px 60px rgba(30, 58, 95, 0.07)',
        'fs-sidebar': '8px 0 40px rgba(30, 58, 95, 0.05)',
      },
    },
  },
  plugins: [],
};
