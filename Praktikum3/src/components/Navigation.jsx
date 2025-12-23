import { Link, useLocation } from "react-router-dom";

/**
 * Navigation Component
 * Navigasi untuk multi-halaman aplikasi
 */
export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            📚 My Book Library
          </Link>
          <div className="flex gap-4">
            <Link
              to="/"
              className={`font-medium py-2 px-4 rounded-lg transition duration-200 ${
                isActive("/")
                  ? "bg-white text-blue-600"
                  : "hover:bg-blue-500"
              }`}
            >
              Home
            </Link>
            <Link
              to="/stats"
              className={`font-medium py-2 px-4 rounded-lg transition duration-200 ${
                isActive("/stats")
                  ? "bg-white text-blue-600"
                  : "hover:bg-blue-500"
              }`}
            >
              Statistik
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
