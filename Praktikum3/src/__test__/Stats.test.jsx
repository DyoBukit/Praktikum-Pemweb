import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from '../context/BookContext';
import Stats from '../pages/Stats';

/**
 * Test Suite untuk Stats Page
 * Testing menampilkan statistik buku
 */

describe('Stats Page', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render statistik page dengan judul', () => {
    render(
      <BrowserRouter>
        <BookProvider initialBooks={[]}>
          <Stats />
        </BookProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Statistik Perpustakaan/i)).toBeInTheDocument();
  });

  it('should display total books count section', () => {
    render(
      <BrowserRouter>
        <BookProvider initialBooks={[]}>
          <Stats />
        </BookProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Total Buku')).toBeInTheDocument();
  });

  it('should display books by status sections', () => {
    render(
      <BrowserRouter>
        <BookProvider initialBooks={[]}>
          <Stats />
        </BookProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Sedang Dibaca')).toBeInTheDocument();
    expect(screen.getByText('Ingin Dibeli')).toBeInTheDocument();
    expect(screen.getByText('Milik Saya')).toBeInTheDocument();
  });

  it('should show progress bar labels untuk setiap status', () => {
    render(
      <BrowserRouter>
        <BookProvider initialBooks={[]}>
          <Stats />
        </BookProvider>
      </BrowserRouter>
    );

    const text = screen.getByText(/Persentase Koleksi Buku/);
    expect(text).toBeInTheDocument();
  });

  it('should display empty state message ketika tidak ada buku', () => {
    render(
      <BrowserRouter>
        <BookProvider initialBooks={[]}>
          <Stats />
        </BookProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Belum ada buku dalam koleksi Anda/)).toBeInTheDocument();
  });

  it('should render stats page with books data structure', () => {
    const { container } = render(
      <BrowserRouter>
        <BookProvider initialBooks={[
          { id: 1, title: 'Book 1', author: 'Author 1', status: 'owned', pages: 300 }
        ]}>
          <Stats />
        </BookProvider>
      </BrowserRouter>
    );

    expect(container).toBeInTheDocument();
    expect(container.querySelector('div.min-h-screen')).toBeInTheDocument();
  });
});
