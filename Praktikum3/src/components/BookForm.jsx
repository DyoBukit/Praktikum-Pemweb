import { useState, useEffect } from "react";
import { useBooks } from "../context/BookContext";

/**
 * BookForm Component
 * Form untuk menambah atau mengedit buku
 * Props:
 *   - editingBook: buku yang sedang diedit (null jika menambah baru)
 *   - onDone: callback setelah sukses menambah/edit
 */
export default function BookForm({ editingBook, onDone }) {
  const { addBook, updateBook } = useBooks();
  const [form, setForm] = useState({ title: "", author: "", status: "owned" });
  const [errors, setErrors] = useState({});

  // Set form value jika sedang edit
  useEffect(() => {
    if (editingBook) {
      setForm({
        title: editingBook.title,
        author: editingBook.author,
        status: editingBook.status,
      });
    } else {
      resetForm();
    }
  }, [editingBook]);

  const resetForm = () => {
    setForm({ title: "", author: "", status: "owned" });
    setErrors({});
  };

  // Validasi form input
  const validateForm = () => {
    const newErrors = {};
    
    if (!form.title.trim()) {
      newErrors.title = "Judul buku wajib diisi";
    }
    if (!form.author.trim()) {
      newErrors.author = "Nama penulis wajib diisi";
    }
    if (form.title.length > 100) {
      newErrors.title = "Judul tidak boleh lebih dari 100 karakter";
    }
    if (form.author.length > 100) {
      newErrors.author = "Nama penulis tidak boleh lebih dari 100 karakter";
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingBook) {
      // Edit existing book
      updateBook(editingBook.id, {
        title: form.title.trim(),
        author: form.author.trim(),
        status: form.status,
      });
    } else {
      // Add new book
      addBook({
        id: Date.now(),
        title: form.title.trim(),
        author: form.author.trim(),
        status: form.status,
      });
    }

    resetForm();
    if (onDone) onDone();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error untuk field yang sedang diubah
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {editingBook ? "Edit Buku" : "Tambah Buku Baru"}
      </h2>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Judul Buku
        </label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Masukkan judul buku"
          value={form.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
          Nama Penulis
        </label>
        <input
          id="author"
          name="author"
          type="text"
          placeholder="Masukkan nama penulis"
          value={form.author}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.author ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status Buku
        </label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="owned">📚 Milik Saya</option>
          <option value="reading">📖 Sedang Dibaca</option>
          <option value="wishlist">❤️ Ingin Dibeli</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          {editingBook ? "Simpan Perubahan" : "Tambah Buku"}
        </button>
        {editingBook && (
          <button
            type="button"
            onClick={() => {
              resetForm();
              if (onDone) onDone();
            }}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}
