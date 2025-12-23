import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookFilter from '../components/BookFilter';

/**
 * Test Suite untuk BookFilter Component
 * Testing filter buku berdasarkan status
 */

describe('BookFilter Component', () => {
  it('should render filter select dengan semua opsi', () => {
    const mockOnChange = vi.fn();
    render(<BookFilter value="all" onChange={mockOnChange} />);

    const selectElement = screen.getByLabelText('Filter berdasarkan Status:');
    expect(selectElement).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(4);
  });

  it('should call onChange callback ketika filter berubah', () => {
    const mockOnChange = vi.fn();
    render(<BookFilter value="all" onChange={mockOnChange} />);

    const selectElement = screen.getByLabelText('Filter berdasarkan Status:');
    fireEvent.change(selectElement, { target: { value: 'reading' } });

    expect(mockOnChange).toHaveBeenCalledWith('reading');
  });

  it('should display selected value correctly', () => {
    const mockOnChange = vi.fn();
    render(<BookFilter value="owned" onChange={mockOnChange} />);

    const selectElement = screen.getByLabelText('Filter berdasarkan Status:');
    expect(selectElement.value).toBe('owned');
  });

  it('should have label untuk filter', () => {
    const mockOnChange = vi.fn();
    render(<BookFilter value="all" onChange={mockOnChange} />);

    expect(screen.getByText('Filter berdasarkan Status:')).toBeInTheDocument();
  });
});
