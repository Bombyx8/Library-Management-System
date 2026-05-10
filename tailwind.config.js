const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,tx,jsx,tsx}"],
  theme: {
    extend: {
     colors: { primary: "#4f46e5", // indigo-600 },
      dbg: "#1e293b",
      dcard: "#334155",
    },
  },
  plugins: [],
}

}