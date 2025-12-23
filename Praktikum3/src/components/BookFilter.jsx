/**
 * BookFilter Component
 * Filter untuk menampilkan buku berdasarkan status
 * Props:
 *   - value: status filter yang aktif
 *   - onChange: callback ketika filter berubah
 */
export default function BookFilter({ value, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
        Filter berdasarkan Status:
      </label>
      <select
        id="filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="all">📚 Semua Buku</option>
        <option value="owned">📚 Milik Saya</option>
        <option value="reading">📖 Sedang Dibaca</option>
        <option value="wishlist">❤️ Ingin Dibeli</option>
      </select>
    </div>
  );
}
