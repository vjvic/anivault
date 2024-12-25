"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, getAnimeByGenres, Anime } from "@/lib/api";
import { useParams } from "next/navigation";
import AnimeGrid from "@/components/AnimeGrid";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GridSkeleton from "@/components/GridLoading";

const GenrePage = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const {
    data: animes,
    isLoading,
    isError,
    isFetching,
  } = useQuery<AnimeResponse<Anime> | null>({
    queryKey: ["animeByGenre", id, page],
    queryFn: () => getAnimeByGenres(id as string, page),
    enabled: !!id,
    keepPreviousData: true,
  });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) return <GridSkeleton />;
  if (isError) return <div>Error fetching anime by genre.</div>;

  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">Anime in this Genre</h1>
      <AnimeGrid animes={animes} />

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

export default GenrePage;
