import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from '../components/BookForm/BookForm';
import { BookProvider } from '../context/BookContext';

test('renders add book form and validate required fields', () => {
  render(<BookProvider><BookForm /></BookProvider>);
  expect(screen.getByPlaceholderText(/Judul/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Penulis/i)).toBeInTheDocument();

  // submit empty -> error messages
  fireEvent.click(screen.getByText(/Tambah/i));
  expect(screen.getByText(/Judul wajib diisi|Penulis wajib diisi/i)).toBeInTheDocument();
});
