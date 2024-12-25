"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopAnime } from "@/lib/api";
import { AnimeResponse, Anime } from "@/lib/api";
import AnimeGrid from "@/components/AnimeGrid";
import PageContainer from "@/components/PageContainer";

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

  const {
    data: animes,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<Anime>>({
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
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">Top</h1>
      <AnimeGrid animes={animes} />
    </PageContainer>
  );
};

export default TopCategoryPage;
