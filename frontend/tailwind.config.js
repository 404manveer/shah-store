 /** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,tsx,ts}"],
   theme: {
   	extend: {
   		
   		colors: {
   		
   		
   			primary:"#FF9B00",
   			secondary: "#3338A0",

   		}
   	}
   },
   plugins: [require("tailwindcss-animate")],
 }