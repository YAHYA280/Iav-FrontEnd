import { Inter, Poppins, IBM_Plex_Sans } from 'next/font/google';


export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({ sm, md, lg }: { sm: number; md: number; lg: number }) {
  return {
    '@media (min-width:600px)': {
      fontSize: pxToRem(sm),
    },
    '@media (min-width:900px)': {
      fontSize: pxToRem(md),
    },
    '@media (min-width:1200px)': {
      fontSize: pxToRem(lg),
    },
  };
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties['fontFamily'];
    fontTertiaryFamily: React.CSSProperties['fontFamily'];
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
    fontWeightMedium: React.CSSProperties['fontWeight'];
    interfaceTitle: React.CSSProperties;
  }
}

export const primaryFont = Inter({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const secondaryFont = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

export const tertiaryFont = IBM_Plex_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});


export const typography = {
  fontFamily: primaryFont.style.fontFamily,
  fontSecondaryFamily: secondaryFont.style.fontFamily,
  fontTertiaryFamily: tertiaryFont.style.fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightSemiBold: 600,
  fontWeightBold: 700,
  fontWeightExtraBold: 800,
  fontWeightBlack: 900,

  h1: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 800,
    lineHeight: 1.2,
    fontSize: pxToRem(48),
    letterSpacing: '-0.02em',
    ...responsiveFontSizes({ sm: 56, md: 64, lg: 72 }),
  },
  h2: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 700,
    lineHeight: 1.3,
    fontSize: pxToRem(36),
    letterSpacing: '-0.01em',
    ...responsiveFontSizes({ sm: 42, md: 48, lg: 56 }),
  },
  h3: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 600,
    lineHeight: 1.4,
    fontSize: pxToRem(28),
    letterSpacing: '-0.01em',
    ...responsiveFontSizes({ sm: 32, md: 36, lg: 40 }),
  },
  h4: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 600,
    lineHeight: 1.4,
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ sm: 26, md: 28, lg: 32 }),
  },
  h5: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ sm: 22, md: 24, lg: 24 }),
  },
  h6: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ sm: 19, md: 20, lg: 20 }),
  },

  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    letterSpacing: '0.01em',
  },
  subtitle2: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    letterSpacing: '0.01em',
  },

  body1: {
    fontWeight: 400,
    lineHeight: 1.6,
    fontSize: pxToRem(16),
    letterSpacing: '0.01em',
  },
  body2: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    letterSpacing: '0.01em',
  },

  caption: {
    fontWeight: 400,
    lineHeight: 1.4,
    fontSize: pxToRem(12),
    letterSpacing: '0.02em',
  },

  overline: {
    fontWeight: 600,
    lineHeight: 1.4,
    fontSize: pxToRem(12),
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },

  button: {
    fontWeight: 600,
    lineHeight: 1.4,
    fontSize: pxToRem(14),
    letterSpacing: '0.02em',
    textTransform: 'unset',
  },

  display: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 800,
    lineHeight: 1.1,
    fontSize: pxToRem(64),
    letterSpacing: '-0.03em',
    ...responsiveFontSizes({ sm: 72, md: 80, lg: 96 }),
  },

  cardTitle: {
    fontFamily: secondaryFont.style.fontFamily,
    fontWeight: 600,
    lineHeight: 1.3,
    fontSize: pxToRem(18),
    letterSpacing: '-0.01em',
  },

  cardDescription: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
    letterSpacing: '0.01em',
  },

  label: {
    fontWeight: 500,
    lineHeight: 1.4,
    fontSize: pxToRem(12),
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },

  interfaceTitle: {
    fontFamily: tertiaryFont.style.fontFamily,
    fontWeight: 700,
    fontSize: pxToRem(30),
    lineHeight: 0.42,
    letterSpacing: '-0.211px',
    textTransform: 'capitalize',
    color: '#FFF',
  },
} as const;
