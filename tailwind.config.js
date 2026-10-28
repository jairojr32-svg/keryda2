/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          980: '#02060D',
          950: '#040B16', // 1ª Cor: Azul Marinho Profundo Principal
          900: '#071426', // Azul Marinho Superfície
          850: '#0B1E38', // Azul Marinho Card
          800: '#132D52', // Azul Marinho Borda
          700: '#1E4174',
        },
        gold: {
          100: '#F8F1E4',
          200: '#EDE0C7',
          300: '#E5C99B', // Luz Champagne do Monograma KR
          400: '#D4B280', // Ouro Acetinado
          500: '#C59B64', // 2ª Cor: Dourado Nobre Oficial KR
          600: '#9A7240', // Dourado Escuro para Fundo Alabastro/Branco
          700: '#78552B',
        },
        alabaster: {
          50: '#FFFFFF',  // 3ª Cor: Branco Puro
          100: '#F5F2EB', // Alabastro Creme (Zona Clara do Scroll)
          200: '#E5DFD3',
          300: '#A5B4C8',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['"Instrument Serif"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
