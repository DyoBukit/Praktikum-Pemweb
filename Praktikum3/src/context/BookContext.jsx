import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BookContext = createContext();

/**
 * BookProvider Component
 * Provides global state untuk manajemen buku menggunakan Context API
 * State: books (array of books), actions: addBook, updateBook, removeBook
 */
export function BookProvider({ children, initialBooks }) {
  const [books, setBooks] = useLocalStorage("books", initialBooks || []);

  // Add new book
  const addBook = (book) => {
    setBooks((prev) => [...prev, book]);
  };

  // Update existing book
  const updateBook = (id, data) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...data } : b))
    );
  };

  // Remove book
  const removeBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BookContext.Provider
      value={{ books, addBook, updateBook, removeBook }}
    >
      {children}
    </BookContext.Provider>
  );
}

/**
 * useBooks Hook
 * Custom hook untuk mengakses BookContext
 * Throws error jika digunakan di luar BookProvider
 */
export const useBooks = () => {
  const ctx = useContext(BookContext);
  if (!ctx) {
    throw new Error("useBooks harus dipakai dalam BookProvider");
  }
  return ctx;
};
