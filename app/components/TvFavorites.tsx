"use client";

import { useEffect, useState } from "react";
import { addFavorite, removeFavorite, isFavorite, FavoriteItem } from "../utils/favorites";

interface Props {
  tv: {
    id: number;
    name: string;
    poster_path: string;
  };
}

export default function TvFavorites({ tv }: Props) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite(tv.id, "tv"));
  }, [tv.id]);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(tv.id, "tv");
      setFavorite(false);
    } else {
      const item: FavoriteItem = {
        id: tv.id,
        type: "tv",
        title: tv.name,
        image: tv.poster_path,
      };
      addFavorite(item);
      setFavorite(true);
    }
  };

  return (
   <button
  onClick={toggleFavorite}
  className={`mt-0 ml-2 p-2 rounded-full transition-colors duration-300 ${
    favorite ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
  }`}
  title={favorite ? "Remove from Favorites" : "Add to Favorites"}
>
  {favorite ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        clipRule="evenodd"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
      />
    </svg>
  )}
</button>

  );
}
