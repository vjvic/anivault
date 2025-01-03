"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, fetchAnimeSearch, Anime } from "@/lib/api";
import AnimeGrid from "@/components/AnimeGrid";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import GridLoading from "@/components/GridLoading";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [page, setPage] = useState(1);

  const {
    data: animes,
    isLoading,
    isError,
    isFetching,
  } = useQuery<AnimeResponse<Anime> | null>({
    queryKey: ["animeSearch", query, page],
    queryFn: () => fetchAnimeSearch({ q: query, page }),
    enabled: !!query,
  });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  if (isLoading) return <GridLoading />;
  if (isError) return <div>Error fetching anime</div>;

  const animeData = animes ?? {
    data: [],
    pagination: { current_page: 1, has_next_page: false },
  };

  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for &quot;{query}&quot;
      </h1>

      {animes?.data.length === 0 && !isLoading && (
        <div className="mt-4">No results found.</div>
      )}

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

      {isFetching && <div>Loading more...</div>}
    </PageContainer>
  );
};

export default SearchPage;
