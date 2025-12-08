import { render, screen } from '@testing-library/react';
import BookList from '../components/BookList/BookList';
import { BookProvider } from '../context/BookContext';

test('shows empty state when no books', () => {
  render(<BookProvider><BookList query="" filter="all" /></BookProvider>);
  expect(screen.getByText(/Tidak ada buku/i)).toBeInTheDocument();
});
