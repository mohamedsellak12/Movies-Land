"use client"; // Needed for Swiper in Next.js App Router

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

interface CastItem {
  id: number;
  name: string;
  profile_path?: string | null;
  character?: string;
  credit_id: string;
}

interface ImageItem {
  file_path: string;
}

interface SerieSwiperProps {
  items: CastItem[] | ImageItem[];
  type: "images" | "cast";
}

const SerieSwiper: FC<SerieSwiperProps> = ({ items, type }) => {
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
      {items.map((item, idx) => {
        if (type === "images") {
          const imageItem = item as ImageItem;
          return (
            <SwiperSlide key={idx}>
              <a
                href={`https://image.tmdb.org/t/p/w500${imageItem.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w500${imageItem.file_path}`}
                  alt="Backdrop"
                  width={500}
                  height={750}
                  className="w-full h-40 sm:h-52 object-cover rounded-md"
                />
              </a>
            </SwiperSlide>
          );
        } else {
          const castItem = item as CastItem;
          return (
            <SwiperSlide key={castItem.credit_id}>
              <Link href={`/actor/${castItem.id}`}>
                <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-700 p-2 rounded-lg shadow-md">
                  {castItem.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${castItem.profile_path}`}
                      alt={castItem.name}
                      width={200}
                      height={320}
                      className="w-24 h-32 object-cover rounded-md mb-2"
                    />
                  ) : (
                    <div className="w-24 h-32 bg-gray-400 flex items-center justify-center text-xs text-gray-600 mb-2">
                      No Image
                    </div>
                  )}
                  <p className="text-sm font-semibold text-center">{castItem.name}</p>
                  <p className="text-xs text-gray-500 text-center">{castItem.character}</p>
                </div>
              </Link>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};

export default SerieSwiper;
