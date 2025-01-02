/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";
 
export default {
   darkMode: ["class"],
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      colors: {
         linen: "#F2E6D9",
         "pale-rose": "#F3E5E3",
         "soft-green": "#A6B8A1",
         "light-clay": "#C5BBB4",
         "dark-clay": "#9A8371",
         "mossy-green": "#3A5246",
         white: "#FFF",
         black: "000",
      },
      extend: {
         borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
         },
      },
   },
   plugins: [animate],
};