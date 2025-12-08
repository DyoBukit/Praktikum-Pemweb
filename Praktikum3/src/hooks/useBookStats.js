import { useMemo } from 'react';

export default function useBookStats(books) {
  return useMemo(() => {
    const total = books.length;
    const owned = books.filter(b => b.status === 'owned').length;
    const reading = books.filter(b => b.status === 'reading').length;
    const wishlist = books.filter(b => b.status === 'wishlist').length;
    return { total, owned, reading, wishlist };
  }, [books]);
}
