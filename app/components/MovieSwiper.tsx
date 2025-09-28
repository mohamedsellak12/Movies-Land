"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

interface CastItem {
  id: number;
  credit_id: string;
  name: string;
  profile_path?: string | null;
  character?: string;
}

interface ImageItem {
  file_path: string;
}

interface MovieSwiperProps {
  items: CastItem[] | ImageItem[];
  type: "images" | "cast";
}

export default function MovieSwiper({ items, type }: MovieSwiperProps) {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={10}
      navigation
      modules={[Navigation]}
      breakpoints={{
        640: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }}
    >
      {items.map((item, idx) => (
        <SwiperSlide key={type === "images" ? idx : (item as CastItem).credit_id}>
          {type === "images" ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${(item as ImageItem).file_path}`}
              alt="Backdrop"
              width={500} // required
              height={750} 
              className="w-full h-40 sm:h-52 object-cover rounded-md"
            />
          ) : (
            <Link href={`/actor/${(item as CastItem).id}`}>
              <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-lg shadow-md">
                {(item as CastItem).profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${(item as CastItem).profile_path}`}
                    alt={(item as CastItem).name}
                    width={200}
                    height={300}
                    className="w-24 h-32 object-cover rounded-md mb-2"
                  />
                ) : (
                  <div className="w-24 h-32 bg-gray-400 flex items-center justify-center text-xs text-gray-600 mb-2">
                    No Image
                  </div>
                )}
                <p className="text-sm font-semibold text-center">{(item as CastItem).name}</p>
                <p className="text-xs text-gray-500 text-center">{(item as CastItem).character || "-"}</p>
              </div>
            </Link>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
