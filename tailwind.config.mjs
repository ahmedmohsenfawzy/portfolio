/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#090a0f',
          900: '#022c43',
          850: '#0a3a54',
          800: '#115173',
        },
        accent: {
          DEFAULT: '#00ff7f',
          muted: '#00cc66',
        },
        gold: '#ffd700',
        ink: '#181818',
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'sans-serif'],
        sans: ['Inter', 'Helvetica Neue', 'system-ui', 'sans-serif'],
        script: ['"La Belle Aurore"', 'cursive'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
