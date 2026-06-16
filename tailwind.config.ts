import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#012d1d',
        'primary-container': '#1b4332',
        'on-primary': '#ffffff',
        'on-primary-container': '#86af99',
        'secondary': '#116c4a',
        'secondary-container': '#a1f4c8',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#1b724f',
        'tertiary': '#002d1a',
        'tertiary-container': '#1a432e',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#84b095',
        'error': '#ba1a1a',
        'on-error': '#ffffff',
        'background': '#f8f9fa',
        'on-background': '#191c1d',
        'surface': '#f8f9fa',
        'on-surface': '#191c1d',
        'on-surface-variant': '#414942',
        'surface-container-low': '#f2f4f2',
        'surface-container-high': '#e8ebe8',
        'outline': '#717973',
        'outline-variant': '#c1c8c2',
      },
      fontFamily: {
        'headline': ['Lexend', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'label': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }: { addComponents: Function; theme: Function }) {
      addComponents({
        '.font-headline-xl': {
          fontFamily: theme('fontFamily.headline'),
          fontSize: theme('fontSize.4xl'),
          fontWeight: '700',
          lineHeight: '1.2',
        },
        '.font-headline-lg': {
          fontFamily: theme('fontFamily.headline'),
          fontSize: theme('fontSize.3xl'),
          fontWeight: '700',
          lineHeight: '1.25',
        },
        '.font-headline-md': {
          fontFamily: theme('fontFamily.headline'),
          fontSize: theme('fontSize.2xl'),
          fontWeight: '600',
          lineHeight: '1.3',
        },
        '.font-headline-sm': {
          fontFamily: theme('fontFamily.headline'),
          fontSize: theme('fontSize.xl'),
          fontWeight: '600',
          lineHeight: '1.35',
        },
        '.font-body-md': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.base'),
          fontWeight: '400',
          lineHeight: '1.5',
        },
        '.font-body-sm': {
          fontFamily: theme('fontFamily.body'),
          fontSize: theme('fontSize.sm'),
          fontWeight: '400',
          lineHeight: '1.5',
        },
        '.font-label-bold': {
          fontFamily: theme('fontFamily.label'),
          fontSize: theme('fontSize.sm'),
          fontWeight: '600',
          lineHeight: '1.4',
        },
      });
    },
  ],
}

export default config
