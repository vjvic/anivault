"use client";

import React from "react";
import { fetchTopCharacters } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import PageContainer from "@/components/PageContainer";
import CharacterGrid from "@/components/CharacterGrid";

const CharactersPage = () => {
  const { data: characters } = useQuery({
    queryKey: ["topCharacters"],
    queryFn: fetchTopCharacters,
  });

  console.log("topCharacterPage");

  return (
    <PageContainer>
      <h1 className="text-2xl font-semibold mb-4">Top Chracters</h1>
      <CharacterGrid characters={characters} />
    </PageContainer>
  );
};

export default CharactersPage;
