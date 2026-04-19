import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'PingFang SC',
          'Microsoft YaHei',
          'Noto Sans SC',
          'sans-serif',
        ],
        serif: [
          'var(--font-playfair)',
          'Georgia',
          'serif',
        ],
      },
      colors: {
        apple: {
          blue: '#0071E3',
          gray: '#F5F5F7',
          text: '#1D1D1F',
          secondary: '#6E6E73',
          surface: '#FBFBFD',
        },
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
}

export default config
