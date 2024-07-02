/** @type {import('tailwindcss').Config} */

export default {
  content: ["./*.html", "./public/js/*.js"],
  theme: {
    extend: {
      width: {
        inherit: "inherit",
      },
      height: {
        inherit: "inherit",
      },
      fontFamily: {
        digikala: ["IranYekan", "sans-serif"],
        homa: ["Homa"],
      },
    },
    screens: {
      'mobile':'500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'f-sm-size':'1030px',
      's-sm-size':'1120px',
      'th-sm-size':'1200px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    aspectRatio: {
      '610/380': '610 / 380',
    },
  },
  plugins: [require('flowbite/plugin'),
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--window-inner-height': '100vh', // Default value
        },
      });
    }
  ],
};
