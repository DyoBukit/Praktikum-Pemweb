import { useBooks } from "../context/BookContext";
import useBookStats from "../hooks/useBookStats";
import { Link } from "react-router-dom";

/**
 * Stats Page
 * Menampilkan statistik lengkap tentang koleksi buku
 */
export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  const totalPages = books.reduce((sum, book) => sum + (book.pages || 0), 0);
  const avgPages = books.length > 0 ? (totalPages / books.length).toFixed(0) : 0;

  const getProgressPercentage = (count) => {
    return books.length > 0 ? ((count / books.length) * 100).toFixed(1) : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">📊 Statistik Perpustakaan</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">Total Buku</p>
            <p className="text-3xl font-bold text-blue-600">{books.length}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium">Sedang Dibaca</p>
            <p className="text-3xl font-bold text-green-600">{stats.reading}</p>
            <p className="text-xs text-gray-500 mt-2">{getProgressPercentage(stats.reading)}% dari total</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-pink-500">
            <p className="text-gray-600 text-sm font-medium">Ingin Dibeli</p>
            <p className="text-3xl font-bold text-pink-600">{stats.wishlist}</p>
            <p className="text-xs text-gray-500 mt-2">{getProgressPercentage(stats.wishlist)}% dari total</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <p className="text-gray-600 text-sm font-medium">Milik Saya</p>
            <p className="text-3xl font-bold text-purple-600">{stats.owned}</p>
            <p className="text-xs text-gray-500 mt-2">{getProgressPercentage(stats.owned)}% dari total</p>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Persentase Koleksi Buku</h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">📚 Milik Saya</span>
                <span className="text-sm font-bold text-gray-900">{stats.owned} ({getProgressPercentage(stats.owned)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(stats.owned)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">📖 Sedang Dibaca</span>
                <span className="text-sm font-bold text-gray-900">{stats.reading} ({getProgressPercentage(stats.reading)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(stats.reading)}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">❤️ Ingin Dibeli</span>
                <span className="text-sm font-bold text-gray-900">{stats.wishlist} ({getProgressPercentage(stats.wishlist)}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${getProgressPercentage(stats.wishlist)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {books.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Informasi Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Halaman (Estimasi)</p>
                <p className="text-2xl font-bold text-blue-600">{totalPages}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm font-medium">Rata-rata Halaman per Buku</p>
                <p className="text-2xl font-bold text-blue-600">{avgPages}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {books.length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-lg mb-4">Belum ada buku dalam koleksi Anda</p>
            <Link
              to="/"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Tambahkan Buku Sekarang
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
