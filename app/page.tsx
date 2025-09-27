"use client";

import { useEffect, useState } from "react";
import { getTrendingAll, searchMulti } from "@/lib/tmdb";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Loading from "./loading";
import { Span } from "next/dist/trace";

interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  media_type: "movie" | "tv" | "person";
  poster_path: string | null;
  overview: string;
  first_air_date?:string,
  release_date?:string
}

export default function Home() {
  const [trending, setTrending] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
   const [filter, setFilter] = useState<"all" | "movie" | "tv" >("all");

    async function handleSearch(query: string) {
    const data = await searchMulti(query);
    setTrending(data);
  }
  const filteredResults = trending.filter(
    (item) =>
      filter === "all" ||
      item.media_type === filter ||
      (!item.media_type && filter === "movie") // fallback for /search/movie
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTrendingAll();
        setTrending(data);
      } catch (error) {
        console.error(error);
      } 
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loading/>;

  return (

    <div  className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
  <Navbar onSearch={handleSearch} onFilter={setFilter} />

  <main data-aos="zoom-in" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left">
      🔥 Trending Movies & TV Shows
    </h1>

    <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      {filteredResults.map((item) => (
       <Link key={item.id} href={item.media_type==="tv"?`/tv/${item.id}`:`/movie/${item.id}`}>
        <div
          key={item.id}
          className="bg-gray-200 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 flex flex-col"
        >
          {item.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
              className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover"
            />
          ) : (
            <div className="w-full h-48 sm:h-64 md:h-72 lg:h-80 bg-gray-400 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-white text-sm">No Image</span>
            </div>
          )}

          <div className="p-3 flex flex-col flex-grow">
            <h2 className="text-sm sm:text-base md:text-lg font-semibold line-clamp-1">
              {item.title || item.name} 
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {(item.media_type || "movie").toUpperCase()} 
             <span>
                {item.media_type === "tv" ? (
                    <span>  ({item.first_air_date?.slice(0, 4) || "N/A"})</span>
                    ) : (
                     <span>  ({item.release_date?.slice(0, 4) || "N/A"})</span>
                 )}
                   </span>

            </p>
          </div>
        </div>
       </Link>
      ))}
    </div>
  </main>
</div>


  );
}
