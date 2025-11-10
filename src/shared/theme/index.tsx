'use client';

import { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { palette } from './palette';
import { typography } from './typography';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const memoizedTheme = useMemo(() => {
    return createTheme({
      typography: {
        ...typography,
        h1: typography.h1,
        h2: typography.h2,
        h3: typography.h3,
        h4: typography.h4,
        h5: typography.h5,
        h6: typography.h6,
        subtitle1: typography.subtitle1,
        subtitle2: typography.subtitle2,
        body1: typography.body1,
        body2: typography.body2,
        caption: typography.caption,
        overline: typography.overline,
        button: typography.button,
      },
      palette: {
        ...palette('light'),
        mode: 'light',
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              fontFamily: typography.fontFamily,
              fontSize: '16px',
              lineHeight: 1.6,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              fontFamily: typography.fontFamily,
              fontWeight: typography.fontWeightSemiBold,
              textTransform: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              fontSize: '14px',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: '0 4px 12px rgba(93, 49, 248, 0.15)',
              },
            },
            contained: {
              background: `linear-gradient(135deg, ${palette('light').primary.main} 0%, ${palette('light').info.main} 100%)`,
              '&:hover': {
                background: `linear-gradient(135deg, ${palette('light').primary.dark} 0%, ${palette('light').info.dark} 100%)`,
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
              border: '1px solid rgba(93, 49, 248, 0.1)',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: '12px',
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: palette('light').primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: palette('light').primary.main,
                  borderWidth: '2px',
                },
              },
            },
          },
        },
      },
    });
  }, []);

  return (
    <MuiThemeProvider theme={memoizedTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
