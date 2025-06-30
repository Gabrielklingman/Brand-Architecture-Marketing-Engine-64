/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#DDD6FE', // Violet 200 - Primary Light
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7C3AED', // Violet 600 - Primary
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        secondary: {
          400: '#4ADE80', // Emerald 400 - Secondary
          500: '#10b981',
          600: '#059669',
        },
        neutral: {
          bg: '#F9FAFB',      // Gray 50 - Neutral BG
          border: '#E5E7EB',  // Gray 200 - Neutral Border
        },
        text: {
          primary: '#111827',  // Gray 900 - Text Primary
          muted: '#6B7280',    // Gray 500 - Text Muted
        },
        error: '#F87171',     // Red 400 - Error
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }], // 40px
        'h2': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }], // 28px
        'body': ['1rem', { lineHeight: '1.4', fontWeight: '400' }],   // 16px
        'button': ['0.875rem', { lineHeight: '1', fontWeight: '600', letterSpacing: '-0.2px' }], // 14px
        'tiny': ['0.75rem', { lineHeight: '1', fontWeight: '400' }], // 12px
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bubble-select': 'bubbleSelect 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'typewriter': 'typewriter 2s steps(40) forwards',
        'soft-lift': 'softLift 0.2s ease-in-out',
        'bounce-gentle': 'bounceGentle 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bubbleSelect: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        softLift: {
          '0%': { transform: 'translateY(0) scale(1)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
          '100%': { transform: 'translateY(-2px) scale(1.03)', boxShadow: '0 8px 25px rgba(124,58,237,0.15)' },
        },
        bounceGentle: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)' },
        }
      },
      backgroundImage: {
        'gradient-a': 'linear-gradient(90deg, #7C3AED 0%, #4ADE80 100%)',
        'gradient-b': 'linear-gradient(135deg, #6366F1 0%, #A78BFA 100%)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}