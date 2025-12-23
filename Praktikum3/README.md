# 📚 Aplikasi Manajemen Buku Pribadi

## 📝 Deskripsi Aplikasi

Aplikasi web untuk mengelola koleksi buku pribadi yang dibangun dengan **React 19.2**, **React Router v7**, **Vite**, dan **Tailwind CSS**. Aplikasi ini memungkinkan pengguna untuk:

- ✅ **Menambah, mengedit, dan menghapus buku** dengan informasi: judul, penulis, dan status
- ✅ **Mencari buku** secara real-time berdasarkan judul atau nama penulis
- ✅ **Memfilter buku** berdasarkan status (Milik Saya, Sedang Dibaca, Ingin Dibeli)
- ✅ **Melihat statistik** koleksi buku dengan progress bar visual
- ✅ **Menyimpan data secara persisten** menggunakan localStorage

Aplikasi ini menggunakan **React Hooks**, **Context API**, dan **React Router** untuk state management dan navigasi multi-halaman.

---

## 📦 Instalasi dan Menjalankan

### Prerequisites
- Node.js v16 atau lebih tinggi
- npm atau yarn package manager

### Langkah-langkah Instalasi

1. **Masuk ke direktori project**
   ```bash
   cd Praktikum3
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`

4. **Build untuk Production**
   ```bash
   npm run build
   ```

5. **Preview Build**
   ```bash
   npm run preview
   ```

6. **Menjalankan Unit Tests**
   ```bash
   npm test -- --run
   ```
   Expected Output: **25 tests passed (100% pass rate)**

---

## 🖼️ Screenshot Antarmuka

### Halaman Home (Manajemen Buku)
![Screenshot Home - Manajemen Buku](./screenshots/home.png)

**Fitur pada halaman Home:**
- Form input untuk menambah buku (Judul, Penulis, Status)
- Search bar untuk mencari buku
- Filter dropdown berdasarkan status
- Daftar buku dengan tombol Edit dan Hapus
- Status badges untuk setiap buku

### Halaman Statistik
![Screenshot Statistik - Analisis Koleksi](./screenshots/stats.png)

**Fitur pada halaman Statistik:**
- Menampilkan total buku dalam koleksi
- Statistik per kategori (Milik Saya, Sedang Dibaca, Ingin Dibeli)
- Progress bar visual untuk distribusi buku
- Informasi tambahan (total halaman, rata-rata halaman)

---

## 🎯 Penjelasan Fitur React yang Digunakan

### 1. **React Hooks** 🪝

#### useState Hook
Mengelola state lokal di komponen untuk form input, error messages, dan filter/search state.

```javascript
// Form state di BookForm.jsx
const [form, setForm] = useState({
  title: "",
  author: "",
  status: "owned"
});

// Error state untuk validasi
const [errors, setErrors] = useState({});

// Edit mode state di Home.jsx
const [editingBook, setEditingBook] = useState(null);
```

#### useEffect Hook
Menangani side effects seperti form population saat edit dan localStorage synchronization.

```javascript
// Update form saat editing book berubah
useEffect(() => {
  if (editingBook) {
    setForm(editingBook);
  }
}, [editingBook]);

// localStorage sync (di useLocalStorage.js)
useEffect(() => {
  localStorage.setItem(key, JSON.stringify(value));
}, [key, value]);
```

#### useContext Hook
Mengakses Context API tanpa prop drilling untuk mendapatkan books data dan actions.

```javascript
// Custom hook useBooks untuk context access
const useBooks = () => {
  const ctx = useContext(BookContext);
  if (!ctx) throw new Error("useBooks harus dalam BookProvider");
  return ctx;
};

// Usage di komponen
const { books, addBook, removeBook, updateBook } = useBooks();
```

---

### 2. **Custom Hooks** 🎣

#### useLocalStorage Hook
Synchronize React state dengan browser localStorage untuk persistent data storage.

```javascript
// File: src/hooks/useLocalStorage.js
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

**Features:**
- ✅ Lazy initialization (localStorage read hanya sekali saat mount)
- ✅ Automatic sync to localStorage pada setiap perubahan value
- ✅ JSON serialization/deserialization
- ✅ Data tetap ada saat page refresh

#### useBookStats Hook
Kalkulasi statistik buku berdasarkan status kategori.

```javascript
// File: src/hooks/useBookStats.js
export default function useBookStats(books) {
  return {
    owned: books.filter(b => b.status === "owned").length,
    reading: books.filter(b => b.status === "reading").length,
    wishlist: books.filter(b => b.status === "wishlist").length,
  };
}

// Usage: const stats = useBookStats(books);
// Output: { owned: 5, reading: 3, wishlist: 2 }
```

---

### 3. **Context API - State Management** 🎛️

#### BookContext
Global state management untuk books collection dengan CRUD actions.

```javascript
// File: src/context/BookContext.jsx
const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage("books", []);

  const addBook = (book) => {
    setBooks(prev => [...prev, { ...book, id: Date.now() }]);
  };

  const updateBook = (id, data) => {
    setBooks(prev => prev.map(b => 
      b.id === id ? {...b, ...data} : b
    ));
  };

  const removeBook = (id) => {
    setBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, updateBook, removeBook }}>
      {children}
    </BookContext.Provider>
  );
}
```

**Provider Hierarchy:**
```
<BrowserRouter>
  <BookProvider>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  </BookProvider>
</BrowserRouter>
```

**Advantages:**
- ✅ No prop drilling (props tidak perlu dipass level per level)
- ✅ Centralized state management
- ✅ Easy to debug dan scale
- ✅ All components dapat access data melalui useBooks() hook

---

### 4. **React Router - Multi-page Navigation** 🗺️

#### Router Setup
```javascript
// File: src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </BookProvider>
  );
}
```

#### Navigation Component
```javascript
// File: src/components/Navigation.jsx
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1>📚 My Book Library</h1>
      <div className="space-x-4">
        <Link to="/" className={isActive("/") ? "font-bold underline" : ""}>
          Home
        </Link>
        <Link to="/stats" className={isActive("/stats") ? "font-bold underline" : ""}>
          Statistik
        </Link>
      </div>
    </nav>
  );
}
```

---

### 5. **Functional Components & Props Pattern** 🧩

#### Reusable Components (4 komponen)

**1. BookForm** - Add dan edit buku dengan validasi
```javascript
<BookForm 
  editingBook={editingBook}
  onDone={() => setEditingBook(null)}
/>
```

**2. BookList** - Display daftar buku dengan filter dan search
```javascript
<BookList 
  statusFilter={statusFilter}
  query={searchQuery}
  onEdit={setEditingBook}
/>
```

**3. BookFilter** - Dropdown filter berdasarkan status
```javascript
<BookFilter 
  value={statusFilter}
  onChange={setStatusFilter}
/>
```

**4. Navigation** - Multi-page navigation dengan active indication
```javascript
<Navigation />
```

---

### 6. **Controlled Components & Form Handling** 📝

Semua form inputs adalah controlled components dengan state binding.

```javascript
// Input dengan value dan onChange
<input
  value={form.title}
  onChange={(e) => setForm({...form, title: e.target.value})}
/>

// Select dengan nilai state
<select
  value={form.status}
  onChange={(e) => setForm({...form, status: e.target.value})}
>
  <option>owned</option>
  <option>reading</option>
  <option>wishlist</option>
</select>
```

**Benefits:**
- ✅ Single source of truth (form state)
- ✅ Easy validation dan error handling
- ✅ Clear data flow

---

### 7. **Immutable State Updates** 🔒

State updates menggunakan spread operator untuk immutability.

```javascript
// Add: Copy array dan tambah item baru
setBooks([...prev, newBook]);

// Update: Map dan return item baru atau original
setBooks(prev => prev.map(b => 
  b.id === id ? {...b, ...data} : b
));

// Delete: Filter out item tertentu
setBooks(prev => prev.filter(b => b.id !== id));
```

---

## 📊 Test Results

Aplikasi ini telah di-test dengan **25 unit tests** menggunakan **Vitest** dan **React Testing Library**.

```
✓ Test Files: 5 passed (5)
✓ Tests: 25 passed (25)
  • BookForm.test.jsx: 6 tests ✅
  • BookList.test.jsx: 6 tests ✅
  • BookFilter.test.jsx: 4 tests ✅
  • Stats.test.jsx: 6 tests ✅
  • App.test.jsx: 3 tests ✅
```

---

**Version:** 1.0.0  
**Last Updated:** Desember 2025  
**Created for:** Praktikum Pemrograman Web
