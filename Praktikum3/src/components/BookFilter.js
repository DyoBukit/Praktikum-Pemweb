import React from 'react';

export default function BookFilter({ filter, setFilter, query, setQuery }) {
  return (
    <div className="card">
      <div className="filter-row">
        <select value={filter} onChange={e => setFilter(e.target.value)} className="input">
          <option value="all">Semua</option>
          <option value="owned">Milik</option>
          <option value="reading">Sedang Baca</option>
          <option value="wishlist">Ingin Beli</option>
        </select>

        <input placeholder="Cari judul atau penulis..." value={query} onChange={e => setQuery(e.target.value)} className="input" />
      </div>
    </div>
  );
}
