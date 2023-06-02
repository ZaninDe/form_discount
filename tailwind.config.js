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
        'hero-nanica': "url('https://smzto.com.br/wp-content/uploads/2022/01/nanica.png')",
        'hero-imaginarium-mobile': "url('/img/hero_imaginarium_mobile.jpg')",
        'hero-imaginarium-desk': "url('/img/hero_imaginarium_desk.jpg')",
        'footer-texture': "url('/img/footer-texture.png')",
        'logo-1': "url('/img/nanica_logo.svg')",
      },
      fontFamily: {
        sans: 'var(--font-roboto)',
        dk: ['var(--font-dk)'],
        gillSans: ['var(--font-gill)']
      }
    },
  },
  plugins: [],
}
