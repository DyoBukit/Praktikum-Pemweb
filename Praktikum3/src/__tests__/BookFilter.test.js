import { render, screen } from '@testing-library/react';
import BookFilter from '../components/BookFilter/BookFilter';

test('filter renders with input and select', () => {
  render(<BookFilter filter="all" setFilter={()=>{}} query="" setQuery={()=>{}} />);
  expect(screen.getByPlaceholderText(/Cari judul atau penulis/i)).toBeInTheDocument();
});
