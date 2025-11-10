import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
    gradient: string;
    sidebar: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}


export const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

export const primary = {
  lighter: '#E8B3FF',
  light: '#A855F7',
  main: '#5D31F8',
  dark: '#4C1D95',
  darker: '#2D1B69',
  contrastText: '#FFFFFF',
};

export const gradient = {
  purple: '#BE30FF',
  blue: '#5D31F8',
  cyan: '#00A3FF',
  main: 'linear-gradient(180deg, #BE30FF -12.38%, #5D31F8 90.01%, #00A3FF 292.93%)',
  withOpacity: 'linear-gradient(180deg, rgba(190, 48, 255, 0.4) -12.38%, rgba(93, 49, 248, 0.4) 90.01%, rgba(0, 163, 255, 0.4) 292.93%)',
};

export const sidebar = {
  background: '#0F1117',
  border: '#5D31F8',
  text: '#FFFFFF',
  hover: '#5D31F8',
  selected: '#5D31F8',
};

export const secondary = {
  lighter: '#E0E7FF',
  light: '#A5B4FC',
  main: '#6366F1',
  dark: '#4F46E5',
  darker: '#3730A3',
  contrastText: '#FFFFFF',
};

export const info = {
  lighter: '#E0F2FE',
  light: '#81D4FA',
  main: '#00A3FF',
  dark: '#0277BD',
  darker: '#01579B',
  contrastText: '#FFFFFF',
};

export const success = {
  lighter: '#D3FCD2',
  light: '#77ED8B',
  main: '#22C55E',
  dark: '#118D57',
  darker: '#065E49',
  contrastText: '#ffffff',
};

export const warning = {
  lighter: '#FFF5CC',
  light: '#FFD666',
  main: '#FFAB00',
  dark: '#B76E00',
  darker: '#7A4100',
  contrastText: grey[800],
};

export const error = {
  lighter: '#FFE9D5',
  light: '#FFAC82',
  main: '#FF5630',
  dark: '#B71D18',
  darker: '#7A0916',
  contrastText: '#FFFFFF',
};

export const common = {
  black: '#000000',
  white: '#FFFFFF',
};

export const action = {
  hover: alpha(primary.main, 0.08),
  selected: alpha(primary.main, 0.16),
  disabled: alpha(grey[500], 0.8),
  disabledBackground: alpha(grey[500], 0.24),
  focus: alpha(primary.main, 0.24),
  hoverOpacity: 0.08,
  disabledOpacity: 0.48,
};

const base = {
  primary,
  secondary,
  info,
  success,
  warning,
  error,
  grey,
  common,
  divider: alpha(grey[500], 0.2),
  action,
};

export function palette(mode: 'light' | 'dark') {
  const light = {
    ...base,
    mode: 'light',
    text: {
      primary: grey[800],
      secondary: grey[600],
      disabled: grey[500],
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
      neutral: grey[200],
      gradient: gradient.withOpacity,
      sidebar: sidebar.background,
    },
    action: {
      ...base.action,
      active: primary.main,
    },
  };

  const dark = {
    ...base,
    mode: 'dark',
    text: {
      primary: '#FFFFFF',
      secondary: grey[500],
      disabled: grey[600],
    },
    background: {
      paper: sidebar.background,
      default: '#0A0B0F',
      neutral: alpha(grey[500], 0.12),
      gradient: gradient.withOpacity,
      sidebar: sidebar.background,
    },
    action: {
      ...base.action,
      active: primary.main,
    },
  };

  return mode === 'light' ? light : dark;
}
