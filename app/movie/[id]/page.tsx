// "use client"; // Only for client-side interactive components

import ClientOnly from "@/app/components/ClientOnly";
import MovieFavorites from "@/app/components/MovieFavorites";
import MovieSwiper from "@/app/components/MovieSwiper";
import { getMovieDetails, getMovieVideos, getMovieWatchProviders } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

// --- Type Definitions ---

interface Genre {
  id: number;
  name: string;
}

interface Language {
  iso_639_1: string;
  english_name: string;
}

interface Cast {
  id: number;
  name: string;
  profile_path?: string | null;
  character?: string;
  credit_id: string;
}

interface Crew {
  id: number;
  name: string;
  job: string;
  credit_id: string;
}

interface ProductionCompany {
  id: number;
  name: string;
  logo_path?: string | null;
}

interface Movie {
  id: number;
  title: string;
  poster_path?: string | null;
  release_date: string;
  status: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  spoken_languages: Language[];
  overview: string;
  credits: {
    cast: Cast[];
    crew: Crew[];
  };
  production_companies: ProductionCompany[];
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface WatchProvider {
  provider_name: string;
  logo_path: string;
}

interface USProviders {
  link: string;
  flatrate?: WatchProvider[];
}

// -------------------------

export default async function MoviePage({ params }: { params: { id: number } }) {
  const movie: Movie = await getMovieDetails(Number(params.id));
  const videos: Video[] = await getMovieVideos(Number(params.id));
  const trailer = videos.find((v) => v.type === "Trailer" && v.site === "YouTube");
  const providers: { US: USProviders } = await getMovieWatchProviders(Number(params.id));
  const usProviders = providers.US;

  return (
    <main className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      {/* Back Link */}
      <div className="mb-4">
        <Link
          href="/"
          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base"
        >
          <FaArrowLeft className="mr-1" />
        </Link>
      </div>

      {/* Movie Container */}
      <ClientOnly>
        <div
          data-aos="zoom-in"
          className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col md:flex-row gap-6"
        >
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={500}
              height={750}
              className="w-full md:w-72 object-cover rounded-lg shadow-md"
            />
          )}

          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{movie.title}</h1>
             <MovieFavorites 
               movie={{
                      ...movie,
                           poster_path: movie.poster_path || "/fallback-poster.jpg"
                   }} 
/>

            </div>

            <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm sm:text-base">
              Release: {movie.release_date} | Status: {movie.status}
            </p>

            <p className="mb-1 text-sm sm:text-base flex items-center">
              <span className="text-yellow-400 text-2xl">★</span>
              <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
              <span className="ml-2 text-gray-400 text-xs">({movie.vote_count} votes)</span>
            </p>

            <p className="mb-2 text-sm sm:text-base">
              Genres: {movie.genres.map((g) => g.name).join(", ")}
            </p>

            <p className="mb-1 text-sm sm:text-base">
              Spoken Languages: {movie.spoken_languages.map((l) => l.english_name).join(", ")}
            </p>

            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">{movie.overview}</p>

            {/* Trailer */}
            {trailer && (
              <div className="mt-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">Trailer</h2>
                <div className="aspect-w-16 aspect-h-9 w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Trailer"
                    allowFullScreen
                    className="rounded-lg shadow-md"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </ClientOnly>

      {/* Cast */}
      {movie.credits?.cast?.length > 0 && (
        <div className="mt-6 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Actors</h2>
          <MovieSwiper items={movie.credits.cast.slice(0, 12)} type="cast" />
        </div>
      )}

      {/* Crew */}
      {movie.credits?.crew?.length > 0 && (
        <div className="mt-6 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Main Crew</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {movie.credits.crew
              .filter((c) => ["Director", "Producer", "Writer"].includes(c.job))
              .map((c) => (
                <div key={c.credit_id} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-center">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-500">{c.job}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Production Companies */}
      {movie.production_companies?.length > 0 && (
        <div className="mt-8 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Production Companies</h2>
          <div className="flex flex-wrap gap-4">
            {movie.production_companies.map((company) => (
              <div
                key={company.id}
                className="flex flex-col items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-md"
              >
                {company.logo_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                    alt={company.name}
                    width={64}
                    height={64}
                    className="object-contain mb-1"
                  />
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center text-xs text-gray-500 mb-1">
                    No Logo
                  </div>
                )}
                <p className="text-sm">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Watch Providers */}
    {usProviders?.flatrate?.length ? (
  <div className="mt-8 max-w-6xl mx-auto">
    <h2 className="text-xl sm:text-2xl font-semibold mb-2">Watch on Subscription Platforms</h2>
    <div className="flex flex-wrap gap-4">
      {(usProviders.flatrate || []).map((p) => (
        <a
          key={p.provider_name}
          href={usProviders.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
            alt={p.provider_name}
            width={64}
            height={64}
            className="object-contain"
          />
          <span className="text-sm mt-1 text-gray-900 dark:text-white">{p.provider_name}</span>
        </a>
      ))}
    </div>
  </div>
) : null}

    </main>
  );
}
