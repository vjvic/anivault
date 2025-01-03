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
    queryKey: ["topCharacters", 1],
    queryFn: () => fetchTopCharacters(1),
  });

  if (isLoading) return <SectionLoading />;
  if (isError) return <div>Error fetching anime</div>;

  const characterData = characters ?? {
    data: [],
    pagination: { current_page: 1, has_next_page: false },
  };

  return (
    <section>
      <ShowcaseCharacters text="Top Characters" characters={characterData} />
    </section>
  );
};

export default TopCharacterSection;
