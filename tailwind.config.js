/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0b1326', surface: '#0b1326', 'surface-dim': '#0b1326', 'surface-bright': '#31394d',
        'surface-container-lowest': '#060e20', 'surface-container-low': '#131b2e', 'surface-container': '#171f33',
        'surface-container-high': '#222a3d', 'surface-container-highest': '#2d3449', 'surface-variant': '#2d3449',
        'on-surface': '#dae2fd', 'on-surface-variant': '#bcc9cd', 'on-background': '#dae2fd', outline: '#869397',
        'outline-variant': '#3d494c', primary: '#4cd7f6', 'primary-container': '#06b6d4', 'primary-fixed': '#acedff',
        'primary-fixed-dim': '#4cd7f6', 'on-primary': '#003640', 'on-primary-container': '#00424f',
        'on-primary-fixed': '#001f26', 'on-primary-fixed-variant': '#004e5c', 'inverse-primary': '#00687a',
        secondary: '#4edea3', 'secondary-container': '#00a572', 'secondary-fixed': '#6ffbbe',
        'secondary-fixed-dim': '#4edea3', 'on-secondary': '#003824', 'on-secondary-container': '#00311f',
        'on-secondary-fixed': '#002113', 'on-secondary-fixed-variant': '#005236', tertiary: '#ffb95f',
        'tertiary-container': '#e79400', 'tertiary-fixed': '#ffddb8', 'tertiary-fixed-dim': '#ffb95f',
        'on-tertiary': '#472a00', 'on-tertiary-container': '#563400', 'on-tertiary-fixed': '#2a1700',
        'on-tertiary-fixed-variant': '#653e00', error: '#ffb4ab', 'error-container': '#93000a', 'on-error': '#690005',
        'on-error-container': '#ffdad6', 'inverse-surface': '#dae2fd', 'inverse-on-surface': '#283044',
        'surface-tint': '#4cd7f6',
      },
      borderRadius: { DEFAULT: '0.25rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
      spacing: {
        margin: '1rem', 'margin-tablet': '1.5rem', 'margin-desktop': '2rem', gutter: '1rem', 'space-xs': '0.25rem',
        'space-sm': '0.5rem', 'space-md': '1rem', 'space-lg': '1.5rem', 'space-xl': '2rem', 'space-2xl': '3rem',
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
    },
  },
  plugins: [],
}

