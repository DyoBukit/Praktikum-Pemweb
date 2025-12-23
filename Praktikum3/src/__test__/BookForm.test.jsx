import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from '../context/BookContext';
import BookForm from '../components/BookForm';

/**
 * Test Suite untuk BookForm Component
 * Testing menambah buku baru dan mengedit buku
 */

const BookFormWrapper = ({ children, editingBook, onDone }) => (
  <BrowserRouter>
    <BookProvider>
      <BookForm editingBook={editingBook} onDone={onDone} />
      {children}
    </BookProvider>
  </BrowserRouter>
);

describe('BookForm Component', () => {
  it('should render form dengan semua input fields', () => {
    render(<BookFormWrapper />);

    expect(screen.getByLabelText('Judul Buku')).toBeInTheDocument();
    expect(screen.getByLabelText('Nama Penulis')).toBeInTheDocument();
    expect(screen.getByLabelText('Status Buku')).toBeInTheDocument();
    expect(screen.getByText('Tambah Buku')).toBeInTheDocument();
  });

  it('should show validation error ketika submit form kosong', async () => {
    render(<BookFormWrapper />);

    const submitButton = screen.getByText('Tambah Buku');
    fireEvent.click(submitButton);

    expect(await screen.findByText('Judul buku wajib diisi')).toBeInTheDocument();
    expect(await screen.findByText('Nama penulis wajib diisi')).toBeInTheDocument();
  });

  it('should accept valid input and clear form setelah submit', async () => {
    render(<BookFormWrapper />);

    const titleInput = screen.getByPlaceholderText('Masukkan judul buku');
    const authorInput = screen.getByPlaceholderText('Masukkan nama penulis');
    const submitButton = screen.getByText('Tambah Buku');

    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.click(submitButton);

    // Verifikasi form telah dikosongkan
    expect(titleInput.value).toBe('');
    expect(authorInput.value).toBe('');
  });

  it('should show edit mode ketika editingBook prop diberikan', () => {
    const mockBook = { id: 1, title: 'Existing Book', author: 'Existing Author', status: 'reading' };
    render(<BookFormWrapper editingBook={mockBook} />);

    expect(screen.getByText('Edit Buku')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Book')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Existing Author')).toBeInTheDocument();
    
    const statusSelect = screen.getByLabelText('Status Buku');
    expect(statusSelect.value).toBe('reading');
  });

  it('should show cancel button in edit mode', () => {
    const mockBook = { id: 1, title: 'Test', author: 'Author', status: 'reading' };
    const mockOnDone = vi.fn();

    render(
      <BrowserRouter>
        <BookProvider>
          <BookForm editingBook={mockBook} onDone={mockOnDone} />
        </BookProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Batal')).toBeInTheDocument();
  });

  it('should display error untuk input yang terlalu panjang', async () => {
    render(<BookFormWrapper />);

    const titleInput = screen.getByPlaceholderText('Masukkan judul buku');
    const longText = 'A'.repeat(101); // Lebih dari 100 karakter

    fireEvent.change(titleInput, { target: { value: longText } });
    fireEvent.click(screen.getByText('Tambah Buku'));

    expect(await screen.findByText('Judul tidak boleh lebih dari 100 karakter')).toBeInTheDocument();
  });
});

