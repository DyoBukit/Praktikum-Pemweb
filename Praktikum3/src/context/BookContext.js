import React, { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [stored, setStored] = useLocalStorage('books_v1', []);
  const [books, setBooks] = useState(stored);

  useEffect(() => {
    setStored(books);
  }, [books, setStored]);

  const addBook = (book) => setBooks((s) => [...s, book]);
  const updateBook = (id, patch) => setBooks((s) => s.map(b => b.id === id ? { ...b, ...patch } : b));
  const removeBook = (id) => setBooks((s) => s.filter(b => b.id !== id));
  const clearAll = () => setBooks([]);

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, removeBook, clearAll }}>
      {children}
    </BookContext.Provider>
  );
};
