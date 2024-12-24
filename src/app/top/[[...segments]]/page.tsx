"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopAnime } from "@/lib/api";
import { AnimeResponse, Anime } from "@/lib/api";

// Define types for query parameters
type AnimeSearchQueryType =
  | "tv"
  | "movie"
  | "ova"
  | "special"
  | "ona"
  | "music"
  | "cm"
  | "pv"
  | "tv_special";

type TopAnimeFilter = "airing" | "upcoming" | "bypopularity" | "favorite";

const TopCategoryPage = ({ params }: { params: { segments?: string[] } }) => {
  const [type, filter] = params.segments || [];

  const animeType = (type || "") as AnimeSearchQueryType;
  const animeFilter = (filter || "") as TopAnimeFilter;

  const { data, isLoading, isError } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["top", animeType, animeFilter],
    queryFn: () =>
      fetchTopAnime({
        type: animeType,
        filter: animeFilter,
        page: 1,
      }),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        Failed to load top {type} - {filter}.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Top {type} - {filter}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data?.data.map((item) => (
          <div key={item.mal_id} className="p-2 border rounded">
            <img
              src={item.images.jpg.large_image_url}
              alt={item.title}
              className="rounded-md w-full"
            />
            <h3 className="mt-2 text-center text-sm">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategoryPage;
