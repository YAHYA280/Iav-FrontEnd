import type { Breakpoint } from '@mui/material/styles';

import { useMemo } from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// ----------------------------------------------------------------------

type UseResponsiveReturn = boolean;

export type Query = 'up' | 'down' | 'between' | 'only';

export type Value = Breakpoint | number;

export function useResponsive(query: Query, start?: Value, end?: Value): UseResponsiveReturn {
  const theme = useTheme();

  const getQuery = useMemo(() => {
    switch (query) {
      case 'up':
        return theme.breakpoints.up(start as Value);
      case 'down':
        return theme.breakpoints.down(start as Value);
      case 'between':
        return theme.breakpoints.between(start as Value, end as Value);
      case 'only':
        return theme.breakpoints.only(start as Breakpoint);
      default:
        return theme.breakpoints.up('xs');
    }
  }, [theme, query, start, end]);

  const mediaQueryResult = useMediaQuery(getQuery);

  return mediaQueryResult;
}

// ----------------------------------------------------------------------

type UseWidthReturn = Breakpoint;

export function useWidth(): UseWidthReturn {
  const theme = useTheme();

  const keys = useMemo(() => [...theme.breakpoints.keys].reverse(), [theme]);

  // Use all breakpoints at once instead of calling useMediaQuery in reduce
  const xlMatches = useMediaQuery(theme.breakpoints.up('xl'));
  const lgMatches = useMediaQuery(theme.breakpoints.up('lg'));
  const mdMatches = useMediaQuery(theme.breakpoints.up('md'));
  const smMatches = useMediaQuery(theme.breakpoints.up('sm'));
  const xsMatches = useMediaQuery(theme.breakpoints.up('xs'));

  const width = useMemo(() => {
    if (xlMatches) return 'xl';
    if (lgMatches) return 'lg';
    if (mdMatches) return 'md';
    if (smMatches) return 'sm';
    return 'xs';
  }, [xlMatches, lgMatches, mdMatches, smMatches]);

  return width;
}
