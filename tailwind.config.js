/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#FFC800',
          'primary-hover': '#F0BC00',
          'primary-light': '#FFF8D6',
          bg: '#F7F9FC',
          surface: '#FFFFFF',
          'surface-hover': '#F1F4F9',
          'text-primary': '#172033',
          'text-secondary': '#667085',
          'text-muted': '#98A2B3',
          border: '#E6EAF0',
          'border-focus': '#CBD5E1',
          ai: '#7C4DFF',
          'ai-light': '#F2EEFF',
          'ai-hover': '#6A3AE6',
          success: '#20C997',
          'success-light': '#E8F9F4',
          error: '#FF5C5C',
          'error-light': '#FFEAEA',
          warning: '#F5A524',
          'warning-light': '#FEF6E9',
        },
        subject: {
          math: '#4F7CFF',
          'math-light': '#EEF3FF',
          physics: '#7C4DFF',
          'physics-light': '#F3EEFF',
          chemistry: '#20C997',
          'chemistry-light': '#E8F9F4',
          english: '#FF8A3D',
          'english-light': '#FFF3EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'card-lg': '24px',
        'btn': '14px',
        'input': '14px',
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(16, 24, 40, 0.05), 0 1px 4px -1px rgba(16, 24, 40, 0.03)',
        'elevated': '0 10px 25px -5px rgba(16, 24, 40, 0.08), 0 8px 10px -6px rgba(16, 24, 40, 0.04)',
        'float': '0 20px 30px -10px rgba(16, 24, 40, 0.12), 0 10px 10px -5px rgba(16, 24, 40, 0.04)',
        'brand': '0 8px 20px -4px rgba(255, 200, 0, 0.4)',
        'ai': '0 8px 20px -4px rgba(124, 77, 255, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
