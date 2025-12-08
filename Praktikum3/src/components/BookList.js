import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';

export default function BookList({ query = '', filter = 'all' }) {
  const { books, removeBook } = useBooks();
  const [editingId, setEditingId] = useState(null);

  const shown = books.filter(b => {
    if (filter === 'all') return true;
    return b.status === filter;
  }).filter(b => (b.title + b.author).toLowerCase().includes(query.toLowerCase()));

  if (!shown.length) return <div className="card empty">Tidak ada buku</div>;

  return (
    <ul className="card list">
      {shown.map(b => (
        <li key={b.id}>
          <div>
            <strong>{b.title}</strong> <div className="meta">{b.author} • {b.status}</div>
          </div>
          <div>
            <button className="small-btn" onClick={() => setEditingId(b.id)}>Edit</button>
            <button className="small-btn" onClick={() => {
              if (confirm('Hapus buku?')) removeBook(b.id);
            }}>Hapus</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
