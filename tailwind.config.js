export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom Fonts
      fontFamily: {
        jost: ['Jost', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },

      // Custom Colors
      colors: {
        black: '#0A0522',
        grey: '#E0E2E5',
        white: '#F7F9FD',
        pink: '#FFB8DA',
        purple: '#8063BC',
        blue: '#7C7CD7',

        background:'#F7F9FD', // White background color
        muted: '#E0E2E5',
      },

      // Custom Spacing (for margins, padding, etc.)
      spacing: {
        '18': '4.5rem',  // Custom spacing (example: 18 for 4.5rem)
        '22': '5.5rem',  // Custom spacing
      },

      // Custom Font Sizes
      fontSize: {
        'xxs': '0.625rem',   // 10px
        'xs': '0.875rem',    // 14px
        'l': '1.25rem',      // 20px
        'xxl': '1.75rem',    // 28px
        'xxxl': '2.25rem',   // 36px
      },

      // Custom Border Radius
      borderRadius: {
        'lg': '12px',  
        'xl': '16px',   
      },

      // Custom Box Shadows
      boxShadow: {
        'custom-light': '0 2px 10px rgba(0, 0, 0, 0.1)',  
        'custom-dark': '0 4px 20px rgba(0, 0, 0, 0.3)',  
      },

      // Custom Z-Index values
      zIndex: {
        '1': '1',
        '60': '60',   
        '100': '100',
      },

      gradientColorStops: (theme) => ({
        'pink-to-white': [theme('colors.pink'), theme('colors.white')],
        'purple-to-white': [theme('colors.purple'), theme('colors.white')],
        'blue-to-white': [theme('colors.blue'), theme('colors.white')],

        'pink-to-purple': [theme('colors.pink'), theme('colors.purple')],
        'pink-to-blue': [theme('colors.pink'), theme('colors.blue')],
        'purple-to-blue': [theme('colors.purple'), theme('colors.blue')],
      }),

    },
  },
  plugins: [],
};