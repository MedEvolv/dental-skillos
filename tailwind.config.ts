import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Impeccable: Tinted neutrals, not pure gray
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Primary: Deep teal-blue (sophisticated, not default blue)
        primary: {
          50: "#f0f9fa",
          100: "#d9f0f2",
          200: "#b7e0e4",
          300: "#85c9d0",
          400: "#4baab5",
          500: "#2f8f9c",
          600: "#2a7482",
          700: "#275f6b",
          800: "#264f58",
          900: "#23424a",
          950: "#12282e",
        },
        
        // Accent: Warm coral for energy (complementary to teal)
        accent: {
          50: "#fdf5f3",
          100: "#fbe8e4",
          200: "#f8d5cd",
          300: "#f2b8ab",
          400: "#e88f7d",
          500: "#d96a52",
          600: "#c5533b",
          700: "#a4422f",
          800: "#88382a",
          900: "#713328",
          950: "#3d1812",
        },
        
        // Neutral: Warm gray with slight tint
        neutral: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
          950: "#0c0a09",
        },
        
        // Semantic colors
        success: {
          50: "#f0fdf4",
          500: "#22c55e",
          600: "#16a34a",
        },
        warning: {
          50: "#fffbeb",
          500: "#f59e0b",
          600: "#d97706",
        },
        error: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
        },
      },
      
      // Impeccable: Proper type scale with modular rhythm
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        "7xl": ["4.5rem", { lineHeight: "1.05" }],
      },
      
      // Impeccable: Spacing system
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "6.5": "1.625rem",
        "7.5": "1.875rem",
        "8.5": "2.125rem",
        "9.5": "2.375rem",
        "10.5": "2.625rem",
        "11.5": "2.875rem",
      },
      
      // Impeccable: Purposeful motion (not bounce/elastic)
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "ease-in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
        "ease-out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "ease-in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
      },
      
      // Impeccable: Subtle shadows (not glowy/blurry)
      boxShadow: {
        "soft": "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        "medium": "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        "lifted": "0 10px 15px -3px rgb(0 0 0 / 0.05), 0 4px 6px -4px rgb(0 0 0 / 0.05)",
        "floating": "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
      },
      
      // Impeccable: Rounded corners (purposeful, not excessive)
      borderRadius: {
        "4xl": "2rem",
      },
      
      // Impeccable: Animation keyframes
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(10px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.4s ease-out-expo forwards",
        "fade-in": "fade-in 0.3s ease-out-expo forwards",
        "scale-in": "scale-in 0.3s ease-out-expo forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out-expo forwards",
      },
    },
  },
  plugins: [],
};

export default config;
