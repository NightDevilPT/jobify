// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Paths to your files
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        // Background and Foreground Colors
        background: 'var(--background-color)',
        foreground: 'var(--forground-color)',
        secondary: 'var(--secondary-color)',
        default: 'var(--default)',
        divider: 'var(--divider)',
        content: {
          1: 'var(--content-1)',
          2: 'var(--content-2)',
          3: 'var(--content-3)',
          4: 'var(--content-4)',
        },
        // Status Colors
        success: 'var(--success)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      container:{
        center:true
      },
      fontFamily: {
        'host-grotest': ['Host Grotesk', 'sans-serif'],  // Default sans-serif font
        "secondary": ['Montserrat', 'sans-serif'], // Secondary display font
      },
      gridTemplateColumns: {
        'sidebar-full': '13rem 1fr', // Custom two-column layout
        'sidebar-mini':'5rem 1fr'
      }
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '::selection': {
          backgroundColor: theme('colors.primary.500'), // Primary color as background
          color: 'white', // Foreground color as text color
          borderRadius:`10px`
        },
      };
      addUtilities(newUtilities, ['responsive']);
    },
  ],
};
