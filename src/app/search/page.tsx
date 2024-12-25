"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, fetchAnimeSearch, Anime } from "@/lib/api";
import AnimeGrid from "@/components/AnimeGrid";
import PageContainer from "@/components/PageContainer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    keepPreviousData: true,
  });

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  console.log(animes);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for "{query}"
      </h1>

      {isLoading && <div className="mt-4">Loading...</div>}

      {isError && <div className="mt-4">Failed to fetch data!</div>}

      {animes?.data.length === 0 && !isLoading && (
        <div className="mt-4">No results found.</div>
      )}

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

export default SearchPage;
