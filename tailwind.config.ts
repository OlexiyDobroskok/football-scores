import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: 'hsl(var(--accent))',
      },
    },
  },
  plugins: [],
};
export default config;
