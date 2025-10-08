import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import SearchBar from "./SearchBar";
import { supabase } from "../store/supabaseClient";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileLinks, setShowMobileLinks] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const browseRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!showSearch) return;

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  useEffect(() => {
    if (!showProfileDropdown) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileDropdown]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error signing out:", error.message);
      return;
    }

    localStorage.removeItem("supabaseSession");
    sessionStorage.removeItem("supabaseSession");
    navigate("/");
  };
  useEffect(() => {
    const handleClickOutsideTheBrowse = (e) => {
      if (browseRef.current && !browseRef.current.contains(e.target)) {
        setShowMobileLinks(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideTheBrowse);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideTheBrowse);
  }, [showMobileLinks]);

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

      {/* Mobile arrow toggle button and Mobile Links */}
      <div ref={browseRef} className="md:hidden relative">
        <button
          className="text-white  ml-4 cursor-pointer "
          onClick={() => setShowMobileLinks(!showMobileLinks)}
        >
          Browse ▼
        </button>

        {/* Mobile links */}
        {showMobileLinks && (
          <div className="absolute top-full left-0 mt-1 bg-black/90 text-white flex flex-col gap-2 p-4 rounded shadow-lg z-50 min-w-[150px]">
            <Link to="/" onClick={() => setShowMobileLinks(false)}>
              Home
            </Link>
            <Link to="/tv" onClick={() => setShowMobileLinks(false)}>
              TV Shows
            </Link>
            <Link to="/movies" onClick={() => setShowMobileLinks(false)}>
              Movies
            </Link>
            <Link to="/my-list" onClick={() => setShowMobileLinks(false)}>
              My List
            </Link>
          </div>
        )}
      </div>

      {/* Right side: search + profile */}
      <div className="flex items-center gap-4 relative">
        <button
          onClick={() => setShowSearch(true)}
          className="text-white text-lg cursor-pointer"
        >
          🔍
        </button>

        <div
          className="w-8 h-8 rounded-full bg-gray-500 cursor-pointer"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        ></div>

        {showProfileDropdown && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-black/90 text-white rounded shadow-lg z-50"
            style={{ top: "100%" }}
          >
            <button className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-700">
              Profile 1
            </button>
            <button className="block cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-700">
              Profile 2
            </button>
            <div className="border-t border-gray-700 my-1"></div>
            <button
              onClick={handleSignOut}
              className="block w-full cursor-pointer text-left px-4 py-2 hover:bg-red-600 font-semibold"
            >
              Sign Out
            </button>
          </div>
        )}
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
