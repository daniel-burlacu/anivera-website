import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Palette of Penpot page "01 Home"
      colors: {
        anivera: {
          ink: '#0C4A45',
          deep: '#0C3B37',
          body: '#4A5F5C',
          muted: '#6B8380',
          bg: '#F2F7F6',
          line: '#DCEEEB',
          soft: '#EEF2F1',
          mint: '#E3F2F4',
          teal: '#2F8A84',
          sea: '#9FD9D1',
          onDark: '#C7E4E0',
          ai: '#5B3FD1',
          aiSoft: '#EFEBFD',
        },
      },
      fontFamily: {
        sans: ['var(--font-lexend)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },
};
export default config;
