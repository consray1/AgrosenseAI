import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#081C15",
        "bg-2": "#0a2118",
        card: "#102A23",
        "card-2": "#143028",
        primary: "#2E7D32",
        "primary-2": "#388E3C",
        secondary: "#66BB6A",
        accent: "#00BFA5",
        "accent-2": "#00897B",
        highlight: "#FFC107",
        success: "#00E676",
        danger: "#FF5252",
        muted: "#8BA89E",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-dot": "pulse-dot 2s infinite",
        "ring-pulse": "ring-pulse 3s infinite",
        "scan-rotate": "scan-rotate 4s linear infinite",
        "float-slight": "float-slight 3s ease-in-out infinite",
        "float-card-anim": "float-card-anim 6s ease-in-out infinite",
        "typing-bounce": "typing-bounce 1.4s ease-in-out infinite",
        "zone-pulse": "zone-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.3)" },
        },
        "ring-pulse": {
          "0%": { borderColor: "rgba(0,191,165,0.35)", transform: "scale(0.97)" },
          "50%": { borderColor: "rgba(0,191,165,0.12)", transform: "scale(1.01)" },
          "100%": { borderColor: "rgba(0,191,165,0.35)", transform: "scale(0.97)" },
        },
        "scan-rotate": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "float-slight": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "float-card-anim": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "typing-bounce": {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "30%": { transform: "translateY(-6px)", opacity: "1" },
        },
        "zone-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};
export default config;