import ClientOnly from "@/app/components/ClientOnly";
import SeasonSwiper from "@/app/components/SeasonSwiper";
import SerieSwiper from "@/app/components/SerieSwiper";
import TvFavorites from "@/app/components/TvFavorites";
import { getTVDetails, getTVVideos, getTVWatchProviders } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface Genre {
  id: number;
  name: string;
}

interface Language {
  english_name: string;
}

interface Season {
  id: number;
  name: string;
  poster_path?: string | null;
  episode_count?: number;
  air_date?: string;
  season_number: number;
}

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  credit_id: string;
}

interface Crew {
  id: number;
  name: string;
  job: string;
  credit_id: string;
}

interface Credits {
  cast: Cast[];
  crew: Crew[];
}

interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

interface Backdrop {
  file_path: string;
}

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface USProviders {
  link: string;
  flatrate?: Provider[];
}

interface Serie {
  id: number;
  name: string;
  poster_path: string ;
  overview: string;
  first_air_date: string;
  last_air_date: string;
  status: string;
  number_of_seasons: number;
  number_of_episodes: number;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  spoken_languages: Language[];
  origin_country: string[];
  seasons: Season[];
}

interface TvPageProps {
  params: Promise<{ id: number }>; // params is now a Promise
}


export default async function TvPage({ params }: TvPageProps) {
    const tvId = Number((await params).id);
  const { serie, images, credits }: { serie: Serie; images: { backdrops: Backdrop[] }; credits: Credits } =
    await getTVDetails(tvId);

  const videos: Video[] = await getTVVideos(tvId);
  const trailer = videos.find((v) => v.type === "Trailer" && v.site === "YouTube");

  const providers: { US: USProviders } = await getTVWatchProviders(tvId);
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

      {/* Serie Container */}
      <ClientOnly>
        <div
          data-aos="zoom-in"
          className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col md:flex-row gap-6"
        >
          {serie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              alt={serie.name}
              width={500}
              height={750}
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
              <span className="ml-2 text-gray-400 text-xs">({serie.vote_count} votes)</span>
            </p>

            <p className="mb-2 text-sm sm:text-base">Genres: {serie.genres.map((g) => g.name).join(", ")}</p>

            <p className="mb-1 text-sm sm:text-base">
              Spoken Languages: {serie.spoken_languages.map((l) => l.english_name).join(", ")}
            </p>
            <p className="mb-1 text-sm sm:text-base">Origin Country: {serie.origin_country.join(", ")}</p>

            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">{serie.overview}</p>

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

      {/* Cast Slider */}
      {credits?.cast?.length > 0 && (
        <div className="mt-8 max-w-6xl mx-auto">
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
      {serie?.seasons && (
        <div className="mt-8 max-w-6xl mx-auto">
          <SeasonSwiper items={serie.seasons} />
        </div>
      )}

      {/* Providers */}
      {usProviders?.flatrate?.length ? (
        <div className="mt-8 max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Watch on Subscription Platforms</h2>
          <div className="flex flex-wrap gap-4">
            {(usProviders.flatrate || []).map((p) => (
              <a
                key={p.provider_id}
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
