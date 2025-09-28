import ActorSwiper from "@/app/components/ActorSwiper";
import ClientOnly from "@/app/components/ClientOnly";
import { getActorCredits, getActorDetails } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default async function ActorPage({ params }: { params: { id: string } }) {
  const actorId = Number(params.id);
   
  const actor = await getActorDetails(actorId);
  const credits = await getActorCredits(actorId);

  return (
    <main className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
      {/* Back Link */}
      <div className="mb-4">
        <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline text-sm sm:text-base flex items-center">
            <FaArrowLeft className="mr-1" /> Back
        </Link>
      </div>

      {/* Actor Details */}
      <ClientOnly>
        <div data-aos="zoom-in" className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col md:flex-row gap-6">
          {actor.profile_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              width={500}
              height={750}
              className="w-32 h-44 sm:w-36 sm:h-48 md:w-40 md:h-56 object-contain rounded-lg shadow-md"
            />
          )}
          <div className="flex-1 flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{actor.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm sm:text-base">
              Birthday: {actor.birthday || "Unknown"}
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-1 text-sm sm:text-base">
              Place of Birth: {actor.place_of_birth || "Unknown"}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              {actor.biography || "No biography available."}
            </p>
          </div>
        </div>
      </ClientOnly>

      {/* Actor Credits Slider */}
      {credits.cast?.length > 0 && (
        <div className="mt-6 max-w-6xl mx-auto">
         
            <ActorSwiper items={credits.cast.slice(0, 100)} />
         
        </div>
      )}
    </main>
  );
}
