// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const flowbiteReact = require("flowbite-react/tailwind");
import plugin from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    flowbiteReact.content(),
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [flowbiteReact.plugin(), plugin],
  darkMode: "class",
};
