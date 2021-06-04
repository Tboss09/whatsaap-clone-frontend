module.exports = {
 purge: { content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],options:{
     safelist :['tabs-component','tabs-component ']
 } },
 darkMode: false, // or 'media' or 'class'
 theme: {
  extend: {
   colors: {
    header: '#075E54',
   },
  },
 },
 variants: {
  extend: {
   backgroundColor: ['active'],
  },
 },
 plugins: [],
}
