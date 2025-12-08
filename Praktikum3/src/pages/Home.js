import React, { useState } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import { useBooks } from '../../context/BookContext';
import useDebounce from '../../hooks/useDebounce';

export default function Home() {
  const { books, updateBook } = useBooks();
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const debQuery = useDebounce(query, 250);

  const startEdit = (id) => {
    const b = books.find(x => x.id === id);
    if (b) setEditing(b);
  };

  return (
    <div>
      <BookFilter filter={filter} setFilter={setFilter} query={query} setQuery={setQuery} />
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
        <div>
          <BookForm editing={editing} onDone={() => setEditing(null)} />
        </div>
        <div>
          <BookList filter={filter} query={debQuery} />
        </div>
      </div>
    </div>
  );
}
