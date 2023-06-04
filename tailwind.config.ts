import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // background: colors.zinc[950],
        background: colors.black,
        foreground: colors.zinc[300],
        "foreground-accent": colors.white,
        "background-accent": colors.zinc[600],
      },
    },
  },
  plugins: [],
} satisfies Config;
