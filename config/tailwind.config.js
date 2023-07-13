const shadcnConfig = require("./shadcn.tailwind.js");

module.exports = {
  ...shadcnConfig,
  theme: {
    extend: {
      colors: {
        ...shadcnConfig.theme.extend.colors,
        pink: "hsl(var(--pink))",
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        attention: {
          DEFAULT: "hsl(var(--attention))",
          foreground: "hsl(var(--attention-foreground))",
        },
      },
    },
  },
};
