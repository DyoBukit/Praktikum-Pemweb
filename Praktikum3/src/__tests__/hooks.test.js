import useBookStats from '../hooks/useBookStats';
import { renderHook } from '@testing-library/react';

test('useBookStats computes correctly', () => {
  const books = [
    {id:'1', title:'A', author:'X', status:'owned'},
    {id:'2', title:'B', author:'Y', status:'reading'},
    {id:'3', title:'C', author:'Z', status:'wishlist'}
  ];
  const { result } = renderHook(() => useBookStats(books));
  expect(result.current.total).toBe(3);
  expect(result.current.owned).toBe(1);
  expect(result.current.reading).toBe(1);
  expect(result.current.wishlist).toBe(1);
});
