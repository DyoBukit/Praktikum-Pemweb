import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext';

const empty = { title: '', author: '', status: 'owned' };

export default function BookForm({ editing = null, onDone }) {
  const { addBook, updateBook } = useBooks();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm(empty);
  }, [editing]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Judul wajib diisi';
    if (!form.author.trim()) e.author = 'Penulis wajib diisi';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (editing) updateBook(editing.id, { ...form });
    else addBook({ ...form, id: Date.now().toString() });
    setForm(empty);
    if (onDone) onDone();
  };

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>{editing ? 'Edit Buku' : 'Tambah Buku'}</h3>
      <div className="form-row">
        <input className="input" placeholder="Judul" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        <input className="input" placeholder="Penulis" value={form.author} onChange={e => setForm({...form, author: e.target.value})} />
      </div>
      {errors.title && <div style={{color:'red'}}>{errors.title}</div>}
      {errors.author && <div style={{color:'red'}}>{errors.author}</div>}
      <div className="form-row">
        <select className="input" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option value="owned">Milik</option>
          <option value="reading">Sedang Baca</option>
          <option value="wishlist">Ingin Beli</option>
        </select>
        <button className="button" type="submit">{editing ? 'Simpan' : 'Tambah'}</button>
      </div>
    </form>
  );
}
