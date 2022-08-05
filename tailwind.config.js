const plugin = require("tailwindcss/plugin");

/**
 * Returns an array of numbers according to the length param
 * @param {number} length length of array
 * @param {requestCallback} map function to map values
 * **/
function getEntries(length, map) {
  return Object.fromEntries(
    Array.from(
      {
        length,
      },
      (_, index) => {
        return map(index);
      }
    )
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: "class",
  screens: {
    xxs: "0px",
    xs: "325px",
    sl: "400px",
    sm: "600px",
    md: "1080px",
    lg: "1264px",
    xl: "1327px",
    xxl: "1800px",
  },
  variants: {
    aspectRatio: ["responsive", "hover"],
  },
  theme: {
    extend: {},
    colors: {
      current: "currentColor",
      black: "#000",
      white: "#fff",
      inherit: "inherit",
      initial: "initial",
      transparent: "rgba(0,0,0,0)",
      divider: "#E1E3E5",
      background: "#fff",
      "divider-d": "#222",
      "background-d": "#121212",
      "surface-d": "#191919",
      "primary-base": "#004DE1",
      "primary-base-d": "#2259bf",
    },
    zIndex: {
      ...getEntries(50, (index) => [index, `${index}`]),
    },
  },

  plugins: [
    plugin(({ addVariant }) => {
      addVariant("can-hover", ["@media (pointer: fine) and (hover: hover)"]);
      addVariant("no-hover", ["@media (hover: none) or (pointer: coarse)"]);
      addVariant("supports-backdrop-filter", [
        "@supports (backdrop-filter: blur(1px))",
      ]);
      addVariant("not-supports-backdrop-filter", [
        "@supports not (backdrop-filter: blur(1px))",
      ]);
      addVariant("landscape", "@media (orientation: landscape)");
      addVariant("portrait", "@media (orientation: portrait)");
      addVariant("click-active", ["&.click-active"]);
    }),
  ],
};
