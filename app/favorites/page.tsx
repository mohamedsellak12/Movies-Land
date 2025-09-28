"use client";

import { useEffect, useState } from "react";
import { getFavorites, FavoriteItem } from "../utils/favorites";
import Link from "next/link";
import ClientOnly from "../components/ClientOnly";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <main className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <ClientOnly>
           <h1 data-aos="fade-down"  className="text-3xl sm:text-4xl font-bold mb-6 text-center">My Favorites List</h1>
      </ClientOnly>
  {favorites.length === 0 ? (
    <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
      You don't have any favorites yet.
    </p>
  ) : (
    <div data-aos="zoom-in" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      {favorites.map((item) => (
        <Link
         key={`${item.type}-${item.id}`}
         href={item.type=='tv'?`/tv/${item.id}`:`/movie/${item.id}`}>
        <div
          className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
        >
          {item.image ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${item.image}`}
              alt={item.title}
              className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-xl mb-4 transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full h-60 sm:h-72 md:h-80 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-xl mb-4">
              <span className="text-gray-500 dark:text-gray-300 text-sm">No Image</span>
            </div>
          )}

          <h2 className="text-center text-lg sm:text-xl font-semibold mb-1 text-gray-900 dark:text-white">
            {item.title}
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-500 dark:text-gray-400 capitalize">
            {item.type}
          </p>
        </div>
        </Link>
      ))}
    </div>
  )}
</main>

  );
}
