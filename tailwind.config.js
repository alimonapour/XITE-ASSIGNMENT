module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: 'repeat(auto-fit, minmax(240px, 1fr))',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
}
