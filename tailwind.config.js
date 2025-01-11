/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f5f5f7',
          100: '#e5e5e7',
          200: '#d2d2d7',
          300: '#b8b8bd',
          400: '#86868b',
          500: '#6e6e73',
          600: '#424245',
          700: '#333336',
          800: '#1d1d1f',
          900: '#000000'
        },
        blue: {
          50: '#f2f7fd',
          100: '#e3effc',
          200: '#c7e1f9',
          300: '#96c7f5',
          400: '#5aa6ef',
          500: '#2d88e6',
          600: '#0066cc',
          700: '#0055b3',
          800: '#004080',
          900: '#002233'
        }
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.5rem'
      },
      fontSize: {
        'ios-title': ['34px', { lineHeight: '1.15', letterSpacing: '-0.03em' }],
        'ios-large': ['22px', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'ios-medium': ['17px', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        'ios-small': ['13px', { lineHeight: '1.4', letterSpacing: '0' }],
        'ios-tiny': ['11px', { lineHeight: '1.4', letterSpacing: '0' }]
      },
      boxShadow: {
        'ios': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)',
        'ios-md': '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)'
      }
    }
  },
  plugins: []
} 