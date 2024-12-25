"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, fetchAnimeSearch, Anime } from "@/lib/api";
import AnimeGrid from "@/components/AnimeGrid";
import PageContainer from "@/components/PageContainer";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    data: animes,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<Anime> | null>({
    queryKey: ["animeSearch", query],
    queryFn: () => fetchAnimeSearch({ q: query, page: 1 }),
    enabled: !!query,
  });

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
    </PageContainer>
  );
};

export default SearchPage;
