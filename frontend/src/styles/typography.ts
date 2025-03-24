export const typography = {
  h1: {
    fontSize: '40px',
    fontWeight: '700',
    lineHeight: '1.2em',
    textTransform: 'uppercase',
  },
  h2: {
    fontSize: '32px',
    fontWeight: '600',
    lineHeight: '1.3em',
    letterSpacing: '0.5px',
  },
  h3: {
    fontSize: '28px',
    fontWeight: '500',
    lineHeight: '1.4em',
  },
  body: {
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.6em',
  },
  small: {
    fontSize: '14px',
    fontWeight: '300',
    lineHeight: '1.5em',
  },
  button: {
    primary: {
      fontSize: '18px',
      fontWeight: '700',
      textTransform: 'uppercase',
    },
    secondary: {
      fontSize: '16px',
      fontWeight: '600',
    },
  },
  nav: {
    fontSize: '18px',
    fontWeight: '500',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  form: {
    label: {
      fontSize: '14px',
      fontWeight: '400',
    },
    input: {
      fontSize: '16px',
      fontWeight: '400',
    },
  },
  quote: {
    fontSize: '20px',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  error: {
    fontSize: '14px',
    fontWeight: '700',
    color: 'red',
  },
} as const 