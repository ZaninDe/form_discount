/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          'custom-yellow': '#823811'
        }
      },
      backgroundImage: {
        'hero-pattern': "url('https://smzto.com.br/wp-content/uploads/2022/01/nanica.png')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily: {
        sans: 'var(--font-roboto)'
      }
    },
  },
  plugins: [],
}
