"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopAnime } from "@/lib/api";
import { AnimeResponse, Anime } from "@/lib/api";
import AnimeGrid from "@/components/AnimeGrid";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GridLoading from "@/components/GridLoading";
import { useParams } from "next/navigation";

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

const getTitle = (
  animeType: AnimeSearchQueryType,
  animeFilter: TopAnimeFilter
): string => {
  switch (animeType) {
    case "movie":
      return "Top Movies";
    case "tv":
      switch (animeFilter) {
        case "airing":
          return "Top Airing TV Shows";
        case "bypopularity":
          return "Most Popular TV Shows";
        case "favorite":
          return "Most Favorite TV Shows";
        default:
          return "Top TV Shows";
      }
    default:
      return "Top Anime";
  }
};

const TopCategoryPage = () => {
  const [page, setPage] = useState(1);

  const { segments } = useParams();
  const [type = "", filter = ""] = segments || [];

  const animeType = type as AnimeSearchQueryType;
  const animeFilter = filter as TopAnimeFilter;

  const {
    data: animes,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["top", animeType, animeFilter, page],
    queryFn: () =>
      fetchTopAnime({ type: animeType, filter: animeFilter, page }),
  });

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const title = getTitle(animeType, animeFilter);

  if (isLoading) return <GridLoading />;
  if (isError) return <div>Error fetching anime</div>;

  const animeData = animes ?? {
    data: [],
    pagination: { current_page: 1, has_next_page: false },
  };

  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>

      <AnimeGrid animes={animeData} />

      <div className="flex justify-center items-center gap-4 mt-6">
        <Button disabled={page === 1} onClick={handlePrevPage}>
          <ChevronLeft />
        </Button>
        <span>Page {page}</span>

        <Button
          disabled={!animes?.pagination.has_next_page}
          onClick={handleNextPage}
        >
          <ChevronRight />
        </Button>
      </div>
    </PageContainer>
  );
};

export default TopCategoryPage;
