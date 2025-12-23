import { useBooks } from "../context/BookContext";

/**
 * BookList Component
 * Menampilkan daftar buku dengan fitur filter, search, edit, dan hapus
 * Props:
 *   - statusFilter: filter berdasarkan status
 *   - query: query pencarian buku
 *   - onEdit: callback untuk edit buku
 */
export default function BookList({ statusFilter = "all", query = "", onEdit }) {
  const { books, removeBook } = useBooks();

  // Filter berdasarkan status
  let filtered = statusFilter === "all"
    ? books
    : books.filter((b) => b.status === statusFilter);

  // Filter berdasarkan query pencarian
  if (query.trim()) {
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
    );
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      owned: { label: "📚 Milik Saya", color: "bg-blue-100 text-blue-800" },
      reading: { label: "📖 Sedang Dibaca", color: "bg-green-100 text-green-800" },
      wishlist: { label: "❤️ Ingin Dibeli", color: "bg-pink-100 text-pink-800" },
    };
    const s = statusMap[status] || { label: status, color: "bg-gray-100 text-gray-800" };
    return s;
  };

  if (filtered.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">
          {books.length === 0 ? "Belum ada buku. Tambahkan buku baru!" : "Tidak ada buku yang sesuai dengan pencarian."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">
        Daftar Buku ({filtered.length})
      </h3>
      <div className="grid gap-3">
        {filtered.map((book) => {
          const badgeInfo = getStatusBadge(book.status);
          return (
            <div
              key={book.id}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg">{book.title}</h4>
                  <p className="text-gray-600 text-sm">oleh <span className="italic">{book.author}</span></p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeInfo.color}`}>
                  {badgeInfo.label}
                </span>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit && onEdit(book)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-3 rounded transition duration-200"
                  title="Edit buku"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => removeBook(book.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-3 rounded transition duration-200"
                  title="Hapus buku"
                >
                  🗑️ Hapus
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
