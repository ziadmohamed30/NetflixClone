import { useEffect, useRef, useState } from "react";
import { searchMovies } from "../store/api";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
   const containerRef = useRef(null);


  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
   
      return;
    }
    const delayDebounce = setTimeout(async () => {
      const res = await searchMovies(query);
      setResults(res.data.results);

    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [query]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setResults([]); // hide dropdown
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

   return (
    <div  ref={containerRef} className="p-4  text-white relative w-full max-w-lg mx-auto">
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="input w-full px-4 py-2 rounded bg-black text-white  focus:outline-none"
      />

      {/* Results Dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {results.map((m) => (
            <Link
              to={`/movie/${m.id}`}
              key={m.id}
              onClick={() => setResults([])} // close dropdown on click
              className="flex items-center gap-4 p-3 hover:bg-gray-800 transition"
            >
              <img
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w92${m.poster_path}`
                    : "/no-image.png"
                }
                alt={m.title}
                className="w-12 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-sm font-bold">{m.title}</h3>
                <p className="text-xs text-gray-400">
                  {m.release_date || "Unknown"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
   
}
