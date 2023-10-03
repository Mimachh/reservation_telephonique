const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Vous pouvez ajouter des extensions personnalisées ici
    },
  },
  plugins: [],
});