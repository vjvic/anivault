"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTopCharacters } from "@/lib/api";
import PageContainer from "@/components/PageContainer";
import CharacterGrid from "@/components/CharacterGrid";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CharactersPage = () => {
  const [page, setPage] = useState(1);

  const {
    data: characters,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["topCharacters", page],
    queryFn: () => fetchTopCharacters({ page }),
    keepPreviousData: true,
  });

  console.log(characters);

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
    return <div>Failed to load top characters.</div>;
  }

  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">Top Characters</h1>
      <CharacterGrid characters={characters} />

      <div className="flex justify-center items-center gap-4 mt-6">
        <Button disabled={page === 1} onClick={handlePrevPage}>
          <ChevronLeft />
        </Button>
        <span>Page {page}</span>
        <Button
          disabled={!characters?.pagination.has_next_page}
          onClick={handleNextPage}
        >
          <ChevronRight />
        </Button>
      </div>

      {isFetching && <div>Loading more...</div>}
    </PageContainer>
  );
};

export default CharactersPage;
