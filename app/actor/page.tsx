"use client";
import { useState } from "react";
import Link from "next/link";
import { searchPerson } from "@/lib/tmdb";
import SearchBar from "../components/SearchBar";
import ClientOnly from "../components/ClientOnly";
import Image from "next/image";
// import { NextSeo } from "next-seo"; // optional for better SEO

interface Person {
  id: number;
  name: string;
  profile_path: string | null;
}
export default function PersonSearch() {
  const [results, setResults] = useState<Person[]>([]);

  async function handleSearch(query: string) {
    const data = await searchPerson(query);
    setResults(data);
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-4 sm:p-6">
      {/* Page Title */}
      <ClientOnly>

      <div data-aos="fade-down" className="max-w-6xl mx-auto mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center">
          Search for Actors & Actresses
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
          Find your favorite movie and TV stars and see their profiles
        </p>
      </div>
      </ClientOnly>

      {/* Search Bar */}
      <ClientOnly>
      <div data-aos="fade-up" className="max-w-6xl mx-auto mb-4">
        <SearchBar onSearch={handleSearch} />
      </div>
      </ClientOnly>

      {/* Results Grid */}
      <ClientOnly>

    <div data-aos="zoom-in" className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
       {results
    .filter((person) => person.profile_path) // only keep actors with a profile
    .map((person) => (
      <Link key={person.id} href={`/actor/${person.id}`}>
        <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-800 p-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
          <Image
            src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
            alt={person.name}
            width={500}       // required
            height={750}   
            className="w-28 h-36 sm:w-32 sm:h-40 md:w-36 md:h-44 object-contain rounded-lg mb-2"
          />
          <p className="text-sm sm:text-base font-semibold text-center text-gray-900 dark:text-white">
            {person.name}
          </p>
        </div>
      </Link>
    ))}
</div>
      </ClientOnly>

    </div>
  );
}
