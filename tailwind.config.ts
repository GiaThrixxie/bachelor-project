import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'white': '#e6e6e6',
      'grey': {
        'light': '#787878',
        'medium': '#313131',
        'darker': '#2C2C2C',
        'dark': '262626',
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

