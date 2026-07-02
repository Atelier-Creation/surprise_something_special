/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        birthday: {
          pink: {
            light: '#FFF0F5', // Lavender blush
            DEFAULT: '#FF69B4', // Hot pink
            dark: '#FF1493', // Deep pink
          },
          purple: {
            light: '#E6E6FA', // Lavender
            DEFAULT: '#8A2BE2', // Blue violet
            dark: '#4B0082', // Indigo
          },
          gold: {
            light: '#FFF8DC', // Cornsilk
            DEFAULT: '#D4AF37', // Metallic gold
            dark: '#AA7C11', // Dark gold
          },
          peach: {
            light: '#FFF5EE', // Seashell
            DEFAULT: '#FFDAB9', // Peach
            dark: '#FFB07C', // Dark peach
          },
          lavender: {
            DEFAULT: '#E6E6FA',
            dark: '#D8BFD8', // Thistle
          }
        }
      },
      fontFamily: {
        sans: ['Fraunces', 'sans-serif'],
        handwritten: ['Fraunces', 'Caveat', 'cursive'],
        serif: ['Fraunces','serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.2s infinite ease-in-out',
        'sparkle': 'sparkle 2s ease-in-out infinite',
        'smoke': 'smoke 2s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        sway: {
          '0%, 100%': { transform: 'translateX(0px) rotate(0deg)' },
          '50%': { transform: 'translateX(10px) rotate(2deg)' },
        },
        flicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '20%': { transform: 'scale(0.95) rotate(1deg)', opacity: '0.85' },
          '40%': { transform: 'scale(1.05) rotate(-0.5deg)', opacity: '0.95' },
          '60%': { transform: 'scale(0.9) rotate(0.5deg)', opacity: '0.8' },
          '80%': { transform: 'scale(1.1) rotate(-1.5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.95' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(212, 175, 55, 0.4), 0 0 20px rgba(255, 105, 180, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.8), 0 0 30px rgba(255, 105, 180, 0.4)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.1)' },
          '35%': { transform: 'scale(1.05)' },
          '45%': { transform: 'scale(1.15)' },
        },
        sparkle: {
          '0%, 100%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1' },
        },
        smoke: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.8', filter: 'blur(0px)' },
          '50%': { transform: 'translateY(-15px) scale(1.5)', opacity: '0.4', filter: 'blur(2px)' },
          '100%': { transform: 'translateY(-30px) scale(2)', opacity: '0', filter: 'blur(4px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
