// components/ActorSwiper.tsx
"use client"; // Needed for Swiper in Next.js App Router

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

interface ActorSwiperProps {
  items: any[]; // Array of movies/TV shows
}

const ActorSwiper: React.FC<ActorSwiperProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mt-6 max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Movies & TV Shows ({items.length})</h2>
      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {items.map((item: any) => (
          <SwiperSlide key={item.credit_id}>
            <Link href={item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`}>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
                {item.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                    alt={item.title || item.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-400 flex items-center justify-center text-xs text-gray-600">
                    No Image
                  </div>
                )}
                <div className="p-2">
                  <h3 className="text-sm sm:text-base font-semibold line-clamp-1">
                    {item.title || item.name} 
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    {item.character || item.job || "-"}
                  </p>
                  <p  className="text-xs text-gray-500 dark:text-gray-300">
                    {item.media_type}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActorSwiper;
