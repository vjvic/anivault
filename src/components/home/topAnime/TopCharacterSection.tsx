"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, Characters, fetchTopCharacters } from "@/lib/api";
import ShowcaseCharacters from "@/components/ShowcaseCharacters";
import SectionLoading from "@/components/home/SectionLoading";

const TopCharacterSection = () => {
  const {
    data: characters,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<Characters>>({
    queryKey: ["topCharacters"],
    queryFn: fetchTopCharacters,
  });

  if (isLoading) return <SectionLoading />;
  if (isError) return <div>Error fetching anime</div>;

  return (
    <section>
      <ShowcaseCharacters text="Top Characters" characters={characters} />
    </section>
  );
};

export default TopCharacterSection;
