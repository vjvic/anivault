"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, getAnimeByGenres, Anime } from "@/lib/api";
import { useParams } from "next/navigation";
import AnimeGrid from "@/components/AnimeGrid";
import PageContainer from "@/components/PageContainer";

const GenrePage = () => {
  const { id } = useParams();

  const {
    data: animes,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<Anime> | null>({
    queryKey: ["animeByGenre", id],
    queryFn: () => getAnimeByGenres(id as string, 1),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading anime...</div>;
  }

  if (isError) {
    return <div>Error fetching anime by genre.</div>;
  }

  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">Anime in this Genre</h1>
      <AnimeGrid animes={animes} />
    </PageContainer>
  );
};

export default GenrePage;
