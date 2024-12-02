import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'mesh-1': 'mesh1 25s linear infinite',
        'mesh-2': 'mesh2 30s linear infinite',
        'mesh-3': 'mesh3 35s linear infinite',
      },
      keyframes: {
        mesh1: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
        },
        mesh2: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1.1)' },
          '50%': { transform: 'rotate(-180deg) scale(1)' },
        },
        mesh3: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
