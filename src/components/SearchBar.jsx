import { useEffect, useRef, useState } from "react";
import { searchAll } from "../store/api"; // updated to mixed search
import { Link } from "react-router-dom";
import noImg from "../assets/images/noImg.png"

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const containerRef = useRef(null);

  // Debounced Search
  useEffect(() => {
    if (query.trim().length<3) {
      setResults([]);
      return;
    }

    const delay = setTimeout(async () => {
      const res = await searchAll(query); // mixed movie + tv search
      setResults(res.data.results || []);
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  // Hide dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto p-4 text-white"
    >
      {/* Search Input */}
      <div className="flex items-center bg-black rounded-lg overflow-hidden border border-gray-700 focus-within:ring-2 focus-within:ring-gray-950 transition">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies or TV shows..."
          className="w-full px-4 py-2 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
            className="px-3 text-2xl cursor-pointer text-white hover:text-red-500 transition"
          >
            X
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 border border-gray-700">
          {results.map((item) => {
            const mediaType = item.media_type || "movie"; // fallback
            const title = item.title || item.name;
            return (
              <Link
                to={`/${mediaType}/${item.id}`}
                key={item.id}
                onClick={() => setResults([])}
                className="flex items-center gap-4 p-3 hover:bg-gray-800 transition"
              >
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                      : noImg
                  }
                  alt={title}
                  className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <h3 className="text-sm font-semibold truncate">{title}</h3>
                  <p className="text-xs text-gray-400 truncate">
                    {mediaType === "movie" ? "🎬 Movie" : "📺 TV Show"} •{" "}
                    {item.release_date || item.first_air_date || "Unknown"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
