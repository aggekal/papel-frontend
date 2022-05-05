module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "blue-gray": "#D9E4EC",
      "misty-blue": "#B7CFDC",
      "blue-grotto": "#6AABD2",
      "misty-blue-dark": "#385E72",
    },
    extend: {
      gridTemplateRows: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      gridRow: {
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
      },
    },
    fontFamily: {
      body: ["Roboto"],
    },
  },
  plugins: [],
};
