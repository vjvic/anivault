"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopAnime } from "@/lib/api";
import { AnimeResponse, Anime } from "@/lib/api";
import AnimeGrid from "@/components/AnimeGrid";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [page, setPage] = useState(1);

  const [type, filter] = params.segments || [];
  const animeType = (type || "") as AnimeSearchQueryType;
  const animeFilter = (filter || "") as TopAnimeFilter;

  const {
    data: animes,
    isLoading,
    isError,
    isFetching,
  } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["top", animeType, animeFilter, page],
    queryFn: () =>
      fetchTopAnime({
        type: animeType,
        filter: animeFilter,
        page: page,
      }),
    keepPreviousData: true,
  });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

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
      <h1 className="text-2xl font-semibold mb-4">
        Top {animeType} - {animeFilter}
      </h1>
      <AnimeGrid animes={animes} />

      {/* Pagination Controls */}
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

      {isFetching && <div>Loading more...</div>}
    </PageContainer>
  );
};

export default TopCategoryPage;
