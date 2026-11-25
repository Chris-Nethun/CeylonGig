/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        spice: '#C66B1A',
        sand: '#DEDFDA',
        sage: '#B0BB9D',
        leaf: '#387A5C',
        forest: '#013833'
      }
    }
  },
  plugins: []
};
