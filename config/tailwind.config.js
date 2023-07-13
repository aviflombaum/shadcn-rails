const shadcnConfig = require("./shadcn.tailwind.js");

module.exports = {
  ...shadcnConfig,
  theme: {
    extend: {
      colors: {
        ...shadcnConfig.theme.extend.colors,
        pink: "hsl(var(--pink))",
      },
    },
  },
};
