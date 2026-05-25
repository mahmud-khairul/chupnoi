import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          dark: '#111111',
          card: '#171717',
          red: '#c0392b',
          'red-dark': '#922b21',
          cream: '#f5f0e8',
          border: '#1a1a1a',
          muted: '#888888',
        },
        status: {
          convicted: '#c0392b',
          charged: '#e67e22',
          accused: '#7f8c8d',
          arrested: '#ca8a04',
          absconded: '#374151',
          released: '#4b5563',
          approved: '#27ae60',
          rejected: '#e74c3c',
          pending: '#e67e22',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
