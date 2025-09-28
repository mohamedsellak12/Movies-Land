"use client";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

interface SeasonItem {
  id: number;
  name: string;
  poster_path?: string | null;
  episode_count?: number;
  air_date?: string;
  season_number: number;
}

interface SeasonSwiperProps {
  items: SeasonItem[];
}

const SeasonSwiper: FC<SeasonSwiperProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  // Filter out invalid seasons
  const realSeasons = items.filter((i) => i.season_number !== 0);

  return (
    <div className="mt-6 max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">
        Seasons ({realSeasons.length})
      </h2>

      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        navigation
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {realSeasons.map((season) => (
          <SwiperSlide key={season.id}>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform">
              {season.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                  alt={season.name}
                  width={300}
                  height={450}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-400 flex items-center justify-center text-xs text-gray-600">
                  No Image
                </div>
              )}
              <div className="p-2">
                <h3 className="text-sm sm:text-base font-semibold line-clamp-1">
                  {season.name}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  {season.episode_count ?? "-"} Episodes
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  Air Date: {season.air_date ?? "Unknown"}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SeasonSwiper;
