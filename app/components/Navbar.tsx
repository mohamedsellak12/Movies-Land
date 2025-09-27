"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import useDarkMode from "../hooks/useDarkMode";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";
import ClientOnly from "./ClientOnly";


interface NavbarProps {
  onSearch: (query: string) => void;
  onFilter: (type: "all" | "movie" | "tv") => void;
}

export default function Navbar({ onSearch, onFilter }: NavbarProps) {
  const [active, setActive] = useState<"all" | "movie" | "tv">("all");
   const { theme, toggleTheme } = useDarkMode();

  const handleFilterClick = (type: "all" | "movie" | "tv") => {
    setActive(type);
    onFilter(type);
  };

  return (
    <ClientOnly>
 <nav
  data-aos="fade-down"
  className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4"
>
  {/* Left: Logo */}
  <div className="flex-shrink-0">
    <h1 className="text-2xl font-bold">
      <a href="/" className="hover:text-blue-500">🎬 MoviesLand</a>
    </h1>
  </div>

  {/* Middle: Filters */}
  <div className="flex flex-wrap justify-center md:justify-center gap-2 flex-1">
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
  <div className="flex flex-col md:flex-row items-center gap-2 flex-shrink-0">
    <SearchBar onSearch={onSearch} />
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  </div>

  {/* Bottom: Navigation Links */}
  <div className="flex flex-wrap justify-center md:justify-start gap-4">
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
</nav>
    </ClientOnly>


  );
}
