import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import { BookProvider } from "./context/BookContext";

export default function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </BookProvider>
  );
}
