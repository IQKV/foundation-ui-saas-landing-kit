/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "Cascadia Code", "Roboto Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#3b4ef0", // Main action color (blue.6)
          "primary-content": "#ffffff",
          secondary: "#5465f5", // Hover state color (blue.5)
          "secondary-content": "#ffffff",
          accent: "#10b981", // Success / Fresh green
          "accent-content": "#ffffff",
          neutral: "#243345", // Dark fills (gray.8)
          "neutral-content": "#f8f9fb", // Subtle page bg (gray.0)
          "base-100": "#ffffff", // Surface bg (white)
          "base-200": "#f4f6f9", // Canvas / App shell bg (slate)
          "base-300": "#e4e8ef", // Borders light (gray.2)
          "base-content": "#3d4f63", // Body text (gray.7)
          info: "#3b82f6",
          "info-content": "#ffffff",
          success: "#10b981",
          "success-content": "#ffffff",
          warning: "#f59e0b",
          "warning-content": "#ffffff",
          error: "#ef4444",
          "error-content": "#ffffff",
          "--radius-selector": "4px", // Button/badge border-radius
          "--radius-field": "4px", // Form field border-radius
          "--radius-box": "6px", // Card/Modal border-radius
        },
        dark: {
          primary: "#5465f5", // Active color in dark mode (blue.5)
          "primary-content": "#ffffff",
          secondary: "#7280f8", // Lighter accent (blue.4)
          "secondary-content": "#ffffff",
          accent: "#10b981",
          "accent-content": "#ffffff",
          neutral: "#111c2b", // Darkest color (gray.9)
          "neutral-content": "#f8f9fb", // Subtle page bg (gray.0)
          "base-100": "#1a2436", // Surface bg dark
          "base-200": "#151d2b", // Header bg dark
          "base-300": "#0f1621", // Canvas bg dark
          "base-content": "#e4e8ef", // Body text/borders light (gray.2)
          info: "#3b82f6",
          "info-content": "#ffffff",
          success: "#10b981",
          "success-content": "#ffffff",
          warning: "#f59e0b",
          "warning-content": "#ffffff",
          error: "#ef4444",
          "error-content": "#ffffff",
          "--radius-selector": "4px",
          "--radius-field": "4px",
          "--radius-box": "6px",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};
