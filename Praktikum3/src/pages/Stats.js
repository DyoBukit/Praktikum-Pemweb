import React from 'react';
import { useBooks } from '../../context/BookContext';
import useBookStats from '../../hooks/useBookStats';

export default function Stats() {
  const { books } = useBooks();
  const stats = useBookStats(books);

  return (
    <div>
      <div className="card">
        <h3>Statistik Buku</h3>
        <ul>
          <li>Total: {stats.total}</li>
          <li>Milik: {stats.owned}</li>
          <li>Sedang Baca: {stats.reading}</li>
          <li>Wishlist: {stats.wishlist}</li>
        </ul>
      </div>
      <div className="card">
        <h3>Daftar Semua Buku</h3>
        {books.length === 0 ? <div className="empty">Belum ada buku</div> : (
          <ul className="list">{books.map(b => <li key={b.id}><strong>{b.title}</strong> <div className="meta">{b.author} • {b.status}</div></li>)}</ul>
        )}
      </div>
    </div>
  );
}
