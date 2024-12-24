"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeSearch, Anime } from "@/lib/api";
import Image from "next/image";

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    data: results,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["animeSearch", query],
    queryFn: () => fetchAnimeSearch({ q: query, page: 1 }),
    enabled: !!query,
  });

  const handleNavigate = (id: number) => {
    router.push(`/details/anime/${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>

      {isLoading && <div className="mt-4">Loading...</div>}

      {isError && <div className="mt-4">Failed to fetch data!</div>}

      {results?.data.length === 0 && !isLoading && (
        <div className="mt-4">No results found.</div>
      )}

      <div className="grid grid-cols-5 gap-4 mt-6">
        {results?.data.map((anime: Anime) => (
          <div
            key={anime.mal_id}
            className="group relative cursor-pointer overflow-hidden rounded"
            onClick={() => handleNavigate(anime.mal_id)}
          >
            <Image
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              width={500}
              height={500}
              className="w-full object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
              <span className="text-white font-semibold text-lg text-center px-2">
                {anime.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
