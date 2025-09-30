import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!showSearch) return; // Only listen when modal is open

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false); // close modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-sm px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="text-red-600 text-2xl font-extrabold">
        NETFLIX CLONE
      </Link>

      {/* Links */}
      <div className="hidden md:flex gap-6 text-white font-medium">
        <Link to="/">Home</Link>
        <Link to="/tv">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/my-list">My List</Link>
      </div>

      {/* Right side: search + profile */}
      <div className="flex items-center gap-4">
        {/* Search icon */}
        <button onClick={() => setShowSearch(true)} className="text-white text-lg">
          🔍
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded bg-gray-500"></div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-start justify-center pt-20">
          <div ref={searchRef} className="w-full max-w-2xl px-4">
            <SearchBar />
          </div>
        </div>
      )}
    </nav>
  );
}
