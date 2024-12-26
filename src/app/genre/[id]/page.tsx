"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAnimeByGenres, AnimeResponse, Anime, getGenres } from "@/lib/api";
import AnimeGrid from "@/components/AnimeGrid";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GridLoading from "@/components/GridLoading";
import { useParams } from "next/navigation";

const GenrePage = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [genreName, setGenreName] = useState<string>("Anime");

  const { data: genresData } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

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

  useEffect(() => {
    if (genresData) {
      const genre = genresData?.data.find((g) => g.mal_id === Number(id));
      setGenreName(genre?.name || "Anime");
    }
  }, [id, genresData]);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (isLoading) return <GridLoading />;
  if (isError) return <div>Error fetching anime by genre.</div>;

  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">{genreName} Anime</h1>
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
