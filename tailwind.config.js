/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neon Gold Noir Palette
        noir: {
          bg: '#070A12',
          surface: '#0E1320',
          elevated: '#141A2B',
          cardHover: '#1B233A',
          border: 'rgba(212, 175, 55, 0.15)',
          'border-subtle': 'rgba(244, 246, 251, 0.08)',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F5E6A8',
          dark: '#997D20',
          glow: 'rgba(212, 175, 55, 0.25)',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          light: '#67E8F9',
          glow: 'rgba(34, 211, 238, 0.25)',
        },
        magenta: {
          DEFAULT: '#FF3D8B',
          light: '#FF6EA7',
          glow: 'rgba(255, 61, 139, 0.25)',
        },
        emerald: {
          DEFAULT: '#10B981',
          whatsapp: '#25D366',
        },
        text: {
          DEFAULT: '#F4F6FB',
          muted: '#9AA4BC',
          darkmuted: '#5D6882',
        },
        // Mapping cyber tokens to the new Neon Gold Noir palette for backwards compatibility
        cyber: {
          bg: '#070A12',
          space: '#070A12',
          dark: '#0E1320',
          card: '#141A2B',
          cardHover: '#1B233A',
          cyan: '#22D3EE',
          'cyan-glow': 'rgba(34, 211, 238, 0.25)',
          purple: '#D4AF37',
          'purple-glow': 'rgba(212, 175, 55, 0.25)',
          magenta: '#FF3D8B',
          gold: '#D4AF37',
          emerald: '#10B981',
          border: 'rgba(212, 175, 55, 0.18)',
          'border-light': 'rgba(244, 246, 251, 0.08)',
          text: '#F4F6FB',
          muted: '#9AA4BC',
          darkmuted: '#5D6882',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Sora', 'Space Grotesk', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        cairo: ['Cairo', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Inter', 'sans-serif'], // Graceful alias mapping to Inter
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.25), 0 0 40px rgba(212, 175, 55, 0.1)',
        'gold-glow-sm': '0 0 10px rgba(212, 175, 55, 0.2)',
        'cyan-glow-sm': '0 0 10px rgba(34, 211, 238, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(212, 175, 55, 0.12)',
        'glass-card-hover': '0 12px 40px 0 rgba(212, 175, 55, 0.12), inset 0 0 0 1px rgba(212, 175, 55, 0.28)',
        // Backwards compatibility for existing components
        'neon-cyan': '0 0 15px rgba(34, 211, 238, 0.35)',
        'neon-cyan-sm': '0 0 8px rgba(34, 211, 238, 0.3)',
        'neon-purple': '0 0 15px rgba(212, 175, 55, 0.3)',
        'neon-magenta': '0 0 15px rgba(255, 61, 139, 0.3)',
        'neon-gold': '0 0 15px rgba(212, 175, 55, 0.35)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 0 0 1px rgba(212, 175, 55, 0.15)',
        'cyber-glow': '0 0 25px rgba(212, 175, 55, 0.2)',
      },
    },
  },
  plugins: [],
};
