import { useSearchParams as useNextSearchParams } from 'next/navigation';

export function useSearchParams() {
  return useNextSearchParams();
}
