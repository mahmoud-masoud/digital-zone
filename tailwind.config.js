/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      // '2xl': '1536px',
      // // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: '#0071DC',
        secondary: '#FFC220',
        light: '#E5F2FF',
        after: '#0058AD',
        medium: '#003F7C',
        dark: '#00264B',
        fontColor: '#000D1A',
        background: '#FFF',
      },
      boxShadow: {
        'search-shadow': '0 0 0 4px #72B2EE',
        'card-shadow': '0 0 4px 0px rgb(0, 0, 0,.2)',
      },
    },
  },
  plugins: [],
};
