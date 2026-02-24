/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Custom breakpoints
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1200px',
      '2xl': '1440px',
    },
    extend: {
      // Layout system
      maxWidth: {
        'container': '1280px',
        'screen-2xl': '1440px',
      },
      // 8px spacing system
      spacing: {
        '0': '0',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
      },
      colors: {
        // Brand colors - premium restrained palette
        primary: {
          DEFAULT: '#1e3a5f',
          light: '#2d4a6f',
          dark: '#152a47',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: '#d4af37',
          light: '#e0c050',
          dark: '#b8942e',
        },
        secondary: {
          DEFAULT: '#c9a227',
          light: '#d4b33d',
          foreground: '#1f2937',
        },
        // Gold color palette (used across enhanced pages)
        gold: {
          50: '#fdfaf0',
          100: '#faf3d6',
          200: '#f5e6a8',
          300: '#efd575',
          400: '#e5c040',
          500: '#d4af37',
          600: '#b8942e',
          700: '#9a7a24',
          800: '#7d621d',
          900: '#654e17',
        },
        // Warm neutral system
        background: '#fafaf9',
        surface: '#ffffff',
        'surface-warm': '#fefdfb',
        border: {
          DEFAULT: '#e7e5e4',
          light: '#f5f5f4',
          dark: '#d6d3d1',
        },
        // Text hierarchy
        text: {
          primary: '#1c1917',
          secondary: '#57534e',
          muted: '#a8a29e',
        },
        // Semantic status colors
        status: {
          available: '#10b981',
          'available-bg': 'rgba(16, 185, 129, 0.1)',
          limited: '#f59e0b',
          'limited-bg': 'rgba(245, 158, 11, 0.1)',
          sold: '#64748b',
          'sold-bg': 'rgba(100, 116, 139, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.01em' }],
        'sm': ['13px', { lineHeight: '18px' }],
        'base': ['14px', { lineHeight: '22px' }],
        'md': ['15px', { lineHeight: '24px' }],
        'lg': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'xl': ['18px', { lineHeight: '28px', fontWeight: '600' }],
        '2xl': ['24px', { lineHeight: '32px', fontWeight: '600' }],
        '3xl': ['28px', { lineHeight: '36px', fontWeight: '600' }],
        '4xl': ['36px', { lineHeight: '40px', fontWeight: '700' }],
        '5xl': ['48px', { lineHeight: '1', fontWeight: '700' }],
        '6xl': ['60px', { lineHeight: '1', fontWeight: '700' }],
        '7xl': ['72px', { lineHeight: '1', fontWeight: '700' }],
      },
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px -4px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
      ringColor: {
        DEFAULT: '#1e3a5f',
      },
      ringOffsetWidth: {
        DEFAULT: '2px',
      },
      ringWidth: {
        DEFAULT: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'lift': 'lift 150ms ease-out forwards',
        'bounce': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  plugins: [],
}
