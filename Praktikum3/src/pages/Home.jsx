import { useState } from "react";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import BookFilter from "../components/BookFilter";

/**
 * Home Page
 * Halaman utama untuk mengelola daftar buku
 * Fitur:
 *   - Menambah buku baru
 *   - Mengedit buku yang ada
 *   - Menghapus buku
 *   - Filter berdasarkan status
 *   - Pencarian buku berdasarkan judul atau penulis
 */
export default function Home() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBook, setEditingBook] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          📚 Manajemen Perpustakaan Pribadi
        </h1>

        {/* Form untuk menambah/edit buku */}
        <div className="mb-8">
          <BookForm 
            editingBook={editingBook} 
            onDone={() => setEditingBook(null)} 
          />
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            🔍 Cari Buku
          </label>
          <input
            id="search"
            type="text"
            placeholder="Cari berdasarkan judul atau penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filter */}
        <BookFilter value={statusFilter} onChange={setStatusFilter} />

        {/* Book List */}
        <BookList
          statusFilter={statusFilter}
          query={searchQuery}
          onEdit={setEditingBook}
        />
      </div>
    </div>
  );
}
