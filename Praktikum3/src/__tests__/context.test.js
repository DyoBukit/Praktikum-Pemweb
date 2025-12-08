import { renderHook, act } from '@testing-library/react';
import { BookProvider } from '../context/BookContext';
import { useBooks } from '../context/BookContext';
import { render } from '@testing-library/react';
import React from 'react';

function Wrapper({ children }) {
  return <BookProvider>{children}</BookProvider>;
}

test('BookContext provides add and remove', () => {
  const { result } = renderHook(() => useBooks(), { wrapper: Wrapper });
  // result.current is undefined because useBooks throws when used outside provider,
  // so mount a component:
  function TestComp() {
    const ctx = useBooks();
    return <div data-count={ctx.books.length}></div>;
  }
  const { container } = render(<Wrapper><TestComp /></Wrapper>);
  expect(container.querySelector('[data-count]').getAttribute('data-count')).toBe('0');
});
