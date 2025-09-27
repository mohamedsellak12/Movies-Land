// utils/favorites.ts
export interface FavoriteItem {
  id: number;
  type: "actor" | "movie" | "tv";
  title: string; // actor.name OR movie.title OR tv.name
  image?: string; // profile_path OR poster_path
}

const FAVORITES_KEY = "favorites";

export const getFavorites = (): FavoriteItem[] => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem(FAVORITES_KEY);
  return saved ? JSON.parse(saved) : [];
};

export const addFavorite = (item: FavoriteItem) => {
  const favorites = getFavorites();
  const exists = favorites.some((f) => f.id === item.id && f.type === item.type);
  if (!exists) {
    favorites.push(item);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
};

export const removeFavorite = (id: number, type: FavoriteItem["type"]) => {
  const favorites = getFavorites().filter((f) => !(f.id === id && f.type === type));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const isFavorite = (id: number, type: FavoriteItem["type"]): boolean => {
  return getFavorites().some((f) => f.id === id && f.type === type);
};
