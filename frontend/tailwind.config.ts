import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.gray.700'),
            lineHeight: '1.75',
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: theme('colors.primary.700'),
                textDecoration: 'underline',
              },
            },
            strong: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            'ol > li::marker': {
              color: theme('colors.gray.500'),
            },
            'ul > li::marker': {
              color: theme('colors.gray.500'),
            },
            hr: {
              borderColor: theme('colors.gray.200'),
              marginTop: '3em',
              marginBottom: '3em',
            },
            blockquote: {
              fontWeight: '400',
              fontStyle: 'italic',
              color: theme('colors.gray.700'),
              borderLeftWidth: '0.25rem',
              borderLeftColor: theme('colors.primary.500'),
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              paddingLeft: '1em',
            },
            h1: {
              color: theme('colors.gray.900'),
              fontWeight: '800',
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8888889em',
              lineHeight: '1.1111111',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
              fontSize: '1.875em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3333333',
              scrollMarginTop: '5rem', // For TOC anchors
            },
            h3: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              fontSize: '1.5em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.6',
              scrollMarginTop: '5rem',
            },
            h4: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              lineHeight: '1.5',
            },
            code: {
              color: theme('colors.pink.600'),
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '0.375rem',
              paddingRight: '0.375rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
              overflowX: 'auto',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
              marginTop: '1.7142857em',
              marginBottom: '1.7142857em',
              borderRadius: '0.5rem',
              paddingTop: '1em',
              paddingRight: '1.5em',
              paddingBottom: '1em',
              paddingLeft: '1.5em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: 'inherit',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
            },
            thead: {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.gray.300'),
            },
            'thead th': {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              verticalAlign: 'bottom',
              paddingRight: '0.5714286em',
              paddingBottom: '0.5714286em',
              paddingLeft: '0.5714286em',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: theme('colors.gray.200'),
            },
            'tbody td': {
              verticalAlign: 'baseline',
              paddingTop: '0.5714286em',
              paddingRight: '0.5714286em',
              paddingBottom: '0.5714286em',
              paddingLeft: '0.5714286em',
            },
            img: {
              borderRadius: '0.5rem',
              marginTop: '2em',
              marginBottom: '2em',
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.300'),
              },
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            'ol > li::marker': {
              color: theme('colors.gray.400'),
            },
            'ul > li::marker': {
              color: theme('colors.gray.400'),
            },
            hr: {
              borderColor: theme('colors.gray.700'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.primary.500'),
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            h4: {
              color: theme('colors.gray.100'),
            },
            code: {
              color: theme('colors.pink.400'),
              backgroundColor: theme('colors.gray.800'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.200'),
            },
            thead: {
              borderBottomColor: theme('colors.gray.600'),
            },
            'thead th': {
              color: theme('colors.gray.100'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.gray.700'),
            },
            'tbody td': {
              color: theme('colors.gray.300'),
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.7777778',
            h1: {
              fontSize: '2.5em',
            },
            h2: {
              fontSize: '2em',
            },
            h3: {
              fontSize: '1.625em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config