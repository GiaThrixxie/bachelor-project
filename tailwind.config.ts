import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'white': '#e6e6e6',
      'grey': {
        'lightest': '#505050',
        'light': '#e3e3e3',
        'lighter': '#787878',
        'medium': '#363636',
        'darker': '#313131',
        'dark': '#2C2C2C',
        'darkest': '#262626',
      },
      'red': {
        'light': '#753535',
        'medium': '#562A2A',
        'dark': '#491C1C',
      },
    },
    extend: {},
  },
  plugins: [],
} satisfies Config

