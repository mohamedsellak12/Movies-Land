

import ClientOnly from "@/app/components/ClientOnly";
import MovieFavorites from "@/app/components/MovieFavorites";
import SeasonSwiper from "@/app/components/SeasonSwiper";
import SerieSwiper from "@/app/components/SerieSwiper";
import TvFavorites from "@/app/components/TvFavorites";
import { getTVDetails, getTVVideos, getTVWatchProviders } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";


export default async function MoviePage({ params }: { params: { id: string } }) {
  const { serie, images ,credits  }  = await getTVDetails(Number(params.id));
  const videos = await getTVVideos(Number(params.id));
  const trailer = videos.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
  const providers = await getTVWatchProviders(Number(params.id));

  // Example: Get US providers
  const usProviders = providers.US;

  return (
  <main  className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      {/* Back Link */}
      <div className="mb-4">
        <Link href="/" className="flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base">
            <FaArrowLeft className="mr-1" />
  
        </Link>
      </div>

      {/* Serie Container */}

      <ClientOnly>

      <div data-aos="zoom-in" className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col md:flex-row gap-6">
        {/* Poster */}
        {serie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            alt={serie.name}
            className="w-full md:w-72 object-cover rounded-lg shadow-md"
          />
        )}

        {/* Details */}
        <div className="flex-1 flex flex-col">
           <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{serie.name}</h1>
                <TvFavorites tv={serie} />
            </div>
          <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm sm:text-base">
            First Air: {serie.first_air_date}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm sm:text-base">
            Last Air: {serie.last_air_date}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm sm:text-base">
            Status: {serie.status}
          </p>
          <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm sm:text-base">
            Seasons: {serie.number_of_seasons} | Episodes: {serie.number_of_episodes}
          </p>

          <p className="mb-1 text-sm sm:text-base flex items-center">
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="ml-1">{serie.vote_average.toFixed(1)}</span>
            <span className="ml-2 text-gray-400 text-xs">
              ({serie.vote_count} votes)
            </span>
          </p>

          <p className="mb-2 text-sm sm:text-base">
            Genres: {serie.genres.map((g: any) => g.name).join(", ")}
          </p>

          <p className="mb-1 text-sm sm:text-base">
            Spoken Languages:{" "}
            {serie.spoken_languages.map((l: any) => l.english_name).join(", ")}
          </p>
          <p className="mb-1 text-sm sm:text-base">
            Origin Country: {serie.origin_country.join(", ")}
          </p>

          <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {serie.overview}
          </p>

          {/* Trailer */}
          {trailer && (
            <div className="mt-6">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">Trailer</h2>
              <div className="aspect-w-16 aspect-h-9 w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-md"
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>
      </ClientOnly>

      {/* Cast Slider */}
      {credits?.cast?.length > 0 && (
        <div  className="mt-8 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Actors</h2>
        <SerieSwiper items={credits.cast.slice(0, 120)} type="cast" />
        </div>
      )}

      {/* Images Slider */}
      {images?.backdrops?.length > 0 && (
        <div className="mt-8 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Images</h2>
          <SerieSwiper items={images.backdrops} type="images" />
        </div>
      )}

      {/* Seasons */}


      {
        serie?.seasons &&(
            <div className="mt-8 max-w-6xl mx-auto">
                <SeasonSwiper items={serie.seasons}/>
            </div>
        )
      }
      
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {serie.seasons.map((season: any) => (
          <div
            key={season.id}
            className="bg-gray-200 dark:bg-gray-800 p-3 rounded-xl shadow hover:scale-105 transition-transform duration-300"
          >
            {season.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${season.poster_path}`}
                alt={season.name}
                width={200}
                height={300}
                className="rounded-lg mb-3 object-cover"
              />
            ) : (
              <div className="w-full h-[300px] bg-gray-400 dark:bg-gray-600 flex items-center justify-center text-sm text-gray-700 dark:text-gray-300 rounded-lg mb-3">
                No Image
              </div>
            )}
            <p className="text-md font-semibold text-gray-900 dark:text-white">
              {season.name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {season.episode_count} Episodes
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Air Date: {season.air_date || "Unknown"}
            </p>
          </div>
        ))}
      </div> */}

      {/* Providers */}
      {usProviders?.flatrate?.length > 0 && (
        <div className="mt-8 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            Watch on Subscription Platforms
          </h2>
          <div className="flex flex-wrap gap-4">
            {usProviders.flatrate.map((p: any) => (
              <a
                key={p.provider_id}
                href={usProviders.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                  alt={p.provider_name}
                  className="w-16 h-16 object-contain"
                />
                <span className="text-sm mt-1 text-gray-900 dark:text-white">
                  {p.provider_name}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </main>

  );
}
