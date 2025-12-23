import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

/**
 * Test Suite untuk App Component
 * Testing routing dan navigation
 */

describe('App Component', () => {
  it('should render app dengan navigation', () => {
    render(<App />);

    expect(screen.getByText('📚 My Book Library')).toBeInTheDocument();
  });

  it('should have links untuk home dan stats', () => {
    render(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    const statsLink = screen.getByRole('link', { name: /Statistik/i });

    expect(homeLink).toBeInTheDocument();
    expect(statsLink).toBeInTheDocument();
  });

  it('should render home page pada route /', () => {
    render(<App />);

    expect(screen.getByText(/Manajemen Perpustakaan Pribadi/i)).toBeInTheDocument();
  });
});
