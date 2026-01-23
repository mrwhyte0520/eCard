import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          accent: '#facc15',
          ink: '#000000',
          muted: '#111111',
          surface: '#ffffff',
          line: '#ececec',
          soft: '#f1f1f1',
        },
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.08)',
        lift: '0 18px 50px rgba(0,0,0,0.14)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(1200px 600px at 30% 10%, rgba(250,204,21,0.22), rgba(250,204,21,0) 60%), radial-gradient(900px 500px at 80% 20%, rgba(255,255,255,0.18), rgba(255,255,255,0) 55%)',
      },
    },
  },
  plugins: [],
};

export default config;
