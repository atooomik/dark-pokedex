const colors = require('tailwindcss/colors')
/* TailwindCSS Configuration File */
module.exports = {
  theme: {
    colors: {
      ui: {
        negative: '#333333',
        noir: '#242526',
        semiGray: 'rgba(226,232,240,0.5)',
        white: '#fff'
      },
      types: {
        grass: '#78C850',
        fire: '#F05030',
        water: '#3A98F8',
        bug: '#A8B820',
        poison: '#B050A0',
        psychic: '#F870A0',
        rock: '#B8A058',
        fairy: '#FFB0FF',
        steel: '#A8A8C0',
        normal: '#A8A090',
        electric: '#F8D030',
        fighting: '#A05038',
        dragon: '#7060E0',
        ghost: '#6060B0',
        ice: '#58C8E0',
        dark: '#705848',
        ground: '#D0B058',
        fly: '#98A8F0'
      },
      rose: {
        50: '#FFF1F2',
        100: '#FFE4E6',
        200: '#FECDD3',
        300: '#FDA4AF',
        400: '#FB7185',
        500: '#F43F5E',
        600: '#F71A5C',
        700: '#BB0A30',
        800: '#9F1239',
        900: '#881337'
      },
      blue: {
        50: '#EFF6FF',
        100: '#DBEAFE',
        200: '#BFDBFE',
        300: '#93C5FD',
        400: '#60A5FA',
        500: '#3B82F6',
        600: '#1A6BF7',
        700: '#1D4ED8',
        800: '#1E40AF',
        900: '#1E3A8A'
      },
      yellow: {
        50: '#FEFCE8',
        100: '#FEF9C3',
        200: '#FEF18B',
        300: '#FFEC41',
        400: '#FDE047',
        500: '#EAB308',
        600: '#CA8A04',
        700: '#A16207',
        800: '#854D0E',
        900: '#713F12'
      },
      truegray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#444444',
        800: '#262626',
        900: '#171717'
      },
      gray: colors.gray,
      lightblue: colors.lightBlue,
      pink: colors.pink,
      purple: colors.purple,
      red: colors.red,
      green: colors.green,
      amber: colors.amber
    },
    backgroundColor: theme => theme('colors'),
    spacing: {
      px: '1px',
      0: '0',
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      8: '2rem',
      10: '2.5rem',
      12: '3rem',
      16: '4rem',
      20: '5rem',
      24: '6rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      48: '12rem',
      56: '14rem',
      64: '16rem',
      80: '20rem',
      88: '22rem',
      96: '24rem'
    },
    height: theme => ({
      auto: 'auto',
      ...theme('spacing'),
      full: '100%',
      screen: '100vh'
    })
  },
  variants: {},
  plugins: [],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ],
    options: {
      safelist: [
        'border-types-grass',
        'text-types-grass',
        'border-types-fire',
        'text-types-fire',
        'border-types-water',
        'text-types-water',
        'border-types-bug',
        'text-types-bug',
        'border-types-poison',
        'text-types-poison',
        'border-types-psychic',
        'text-types-psychic',
        'border-types-rock',
        'text-types-rock',
        'border-types-fairy',
        'text-types-fairy',
        'border-types-steel',
        'text-types-steel',
        'border-types-normal',
        'text-types-normal',
        'border-types-electric',
        'text-types-electric',
        'border-types-fighting',
        'text-types-fighting',
        'border-types-dragon',
        'text-types-dragon',
        'border-types-ghost',
        'text-types-ghost',
        'border-types-ice',
        'text-types-ice',
        'border-types-dark',
        'text-types-dark',
        'border-types-ground',
        'text-types-ground',
        'border-types-fly',
        'text-types-fly'
      ]
    }
  }
}
