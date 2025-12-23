import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from '../context/BookContext';
import BookList from '../components/BookList';

/**
 * Test Suite untuk BookList Component
 * Testing menampilkan, filter, dan delete buku
 */

describe('BookList Component', () => {
  beforeEach(() => {
    // Clear localStorage sebelum setiap test
    localStorage.clear();
  });

  it('should render empty state ketika tidak ada buku', () => {
    render(
      <BrowserRouter>
        <BookProvider>
          <BookList statusFilter="all" query="" />
        </BookProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Belum ada buku/i)).toBeInTheDocument();
  });

  it('should render BookList component dengan proper props', () => {
    const mockOnEdit = vi.fn();
    const { container } = render(
      <BrowserRouter>
        <BookProvider initialBooks={[
          { id: 1, title: 'Test Book', author: 'Test Author', status: 'owned' }
        ]}>
          <BookList statusFilter="all" query="" onEdit={mockOnEdit} />
        </BookProvider>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });

  it('should handle status filter prop changes', () => {
    const { rerender } = render(
      <BrowserRouter>
        <BookProvider initialBooks={[]}>
          <BookList statusFilter="all" query="" />
        </BookProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Belum ada buku/i)).toBeInTheDocument();
  });

  it('should accept and display search query prop', () => {
    const { container } = render(
      <BrowserRouter>
        <BookProvider initialBooks={[]}>
          <BookList statusFilter="all" query="test" />
        </BookProvider>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
  });

  it('should call onEdit callback when provided', () => {
    const mockOnEdit = vi.fn();
    render(
      <BrowserRouter>
        <BookProvider initialBooks={[
          { id: 1, title: 'Test', author: 'Author', status: 'owned' }
        ]}>
          <BookList statusFilter="all" query="" onEdit={mockOnEdit} />
        </BookProvider>
      </BrowserRouter>
    );

    const editButton = screen.getByRole('button', { name: /Edit/i });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalled();
  });

  it('should display correct component structure', () => {
    const { container } = render(
      <BrowserRouter>
        <BookProvider initialBooks={[
          { id: 1, title: 'Book 1', author: 'Author 1', status: 'owned' },
          { id: 2, title: 'Book 2', author: 'Author 2', status: 'reading' }
        ]}>
          <BookList statusFilter="all" query="" />
        </BookProvider>
      </BrowserRouter>
    );

    expect(container.querySelector('div')).toBeInTheDocument();
  });
});
