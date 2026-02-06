/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#6b7280", // Gray
          "primary-content": "#ffffff", // White text on primary
          secondary: "#a78bfa", // Purple
          "secondary-content": "#ffffff", // White text on secondary
          accent: "#34d399", // Green
          "accent-content": "#ffffff", // White text on accent
          neutral: "#3d4451", // Dark gray
          "neutral-content": "#ffffff", // White text on neutral
          "base-100": "#ffffff", // White background
          "base-200": "#f3f4f6", // Light gray
          "base-300": "#e5e7eb", // Medium gray
          "base-content": "#1f2937", // Dark text
          info: "#3abff8", // Blue
          "info-content": "#ffffff", // White text on info
          success: "#36d399", // Green
          "success-content": "#ffffff", // White text on success
          warning: "#fbbd23", // Yellow
          "warning-content": "#1f2937", // Dark text on warning
          error: "#f87272", // Red
          "error-content": "#ffffff", // White text on error
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
};
