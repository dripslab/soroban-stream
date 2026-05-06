import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#05070c",
        navy: "#1d4ed8",
        "navy-soft": "#60a5fa",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "Inter", "sans-serif"],
        mono: ["var(--font-space-mono)", "JetBrains Mono", "monospace"],
      },
      boxShadow: {
        glow: "0 0 60px rgba(29, 78, 216, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
