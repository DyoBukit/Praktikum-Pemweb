import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useLocalStorage("books", []);

  const addBook = (book) => {
    setBooks([...books, { id: Date.now(), ...book }]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map((b) => (b.id === id ? { ...b, ...updatedBook } : b)));
  };

  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  // 🔥 Ini yang tadi belum ada → Sekarang ditambahkan
  const filterBooks = (category, search) => {
    let filtered = [...books];

    if (category !== "Semua") {
      filtered = filtered.filter((b) => b.status === category);
    }

    if (search) {
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.author.toLowerCase().includes(search.toLowerCase())
      );
    }

    return filtered;
  };

  return (
    <BookContext.Provider
      value={{ books, addBook, updateBook, deleteBook, filterBooks }}
    >
      {children}
    </BookContext.Provider>
  );
};

// Custom Hook pemanggil context
export const useBooks = () => useContext(BookContext);
