"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import useDarkMode from "../hooks/useDarkMode";
import { Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";
import ClientOnly from "./ClientOnly";


interface NavbarProps {
  onSearch: (query: string) => void;
  onFilter: (type: "all" | "movie" | "tv") => void;
}

export default function Navbar({ onSearch, onFilter }: NavbarProps) {
  const [active, setActive] = useState<"all" | "movie" | "tv">("all");
   const { theme, toggleTheme } = useDarkMode();
   const [menuOpen, setMenuOpen] = useState(false);

  const handleFilterClick = (type: "all" | "movie" | "tv") => {
    setActive(type);
    onFilter(type);
  };

  return (
    <ClientOnly>
 <nav
      data-aos="fade-down"
      className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 sm:px-6 py-4"
    >
      {/* Top Row: Logo + Burger */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link href="/" className="hover:text-blue-500">🎬 MoviesLand</Link>
        </h1>

        {/* Burger Button (hidden on md+) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-col md:flex-row items-center justify-around gap-4 mt-4 md:mt-0">
        {/* Middle: Filters */}
        <div className="flex flex-wrap justify-center gap-2 flex-1">
          {(["all", "movie", "tv"] as const).map((type) => (
            <button
              key={type}
              onClick={() => handleFilterClick(type)}
              className={`px-3 py-1 rounded text-sm sm:text-base ${
                active === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {type === "all" ? "All" : type === "movie" ? "Movies" : "Series"}
            </button>
          ))}
        </div>

        {/* Right: Search + Theme Toggle */}
        <div className="flex flex-col md:flex-row items-center gap-2">
          <SearchBar onSearch={onSearch} />
          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4">
          <Link
            href="/actor"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md 
                       hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                       transition-colors duration-300 font-medium text-sm sm:text-base"
          >
            Actors
          </Link>

          <Link
            href="/favorites"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md 
                       hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                       transition-colors duration-300 font-medium text-sm sm:text-base"
          >
            Favorites
          </Link>
        </div>
      </div>

      {/* Mobile Menu (visible only when open) */}
      {menuOpen && (
        <div className="flex flex-col items-center gap-4 mt-4 md:hidden">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {(["all", "movie", "tv"] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  handleFilterClick(type);
                //   setMenuOpen(false);
                }}
                className={`px-3 py-1 rounded text-sm sm:text-base ${
                  active === type
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {type === "all" ? "All" : type === "movie" ? "Movies" : "Series"}
              </button>
            ))}
          </div>

          {/* Search + Theme */}
          <div className="flex flex-col items-center gap-2 w-full">
            <SearchBar onSearch={onSearch} />
            <button
              onClick={toggleTheme}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <Link
              href="/actor"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md 
                         hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                         transition-colors duration-300 font-medium text-sm sm:text-base"
            >
              Actors
            </Link>

            <Link
              href="/favorites"
              onClick={() => setMenuOpen(false)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md 
                         hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                         transition-colors duration-300 font-medium text-sm sm:text-base"
            >
              Favorites
            </Link>
          </div>
        </div>
      )}
    </nav>
    </ClientOnly>


  );
}
