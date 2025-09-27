"use client"; // ⚠️ indispensable pour tous les composants qui utilisent Swiper

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";

interface SerieSwiperProps {
  items: any[]; // images ou cast
  type: "images" | "cast";
}

export default function SerieSwiper({ items, type }: SerieSwiperProps) {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      navigation={true}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }}
      modules={[Navigation]}
    >
      {items.map((item, idx) => (
        <SwiperSlide key={type === "images" ? idx : item.credit_id}>
          {type === "images" ? (
            <Link href={`https://image.tmdb.org/t/p/w500${item.file_path}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                  alt="Backdrop"
                  className="w-full h-40 sm:h-52 object-cover rounded-md"
                />
            </Link>
          ) : (
            <Link href={`/actor/${item.id}`}>
            <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-lg shadow-md">
              {item.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}
                  alt={item.name}
                  className="w-24 h-32 object-cover rounded-md mb-2"
                />
              ) : (
                <div className="w-24 h-32 bg-gray-400 flex items-center justify-center text-xs text-gray-600 mb-2">
                  No Image
                </div>
              )}
              <p className="text-sm font-semibold text-center">{item.name}</p>
              <p className="text-xs text-gray-500 text-center">{item.character}</p>
            </div>
            </Link>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
