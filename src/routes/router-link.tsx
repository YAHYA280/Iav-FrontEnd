import Link from 'next/link';
import { forwardRef } from 'react';


export const RouterLink = forwardRef<HTMLAnchorElement, any>(
  ({ href, ...other }, ref) => <Link ref={ref} href={href} {...other} />
);

RouterLink.displayName = 'RouterLink';