import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, Characters, fetchTopCharacters } from "@/lib/api";
import ShowcaseCharacters from "@/components/ShowcaseCharacters";

const TopCharacterSection = () => {
  const { data: characters } = useQuery<AnimeResponse<Characters>>({
    queryKey: ["topCharacters"],
    queryFn: fetchTopCharacters,
  });
  return (
    <section>
      <ShowcaseCharacters text="Top Character" characters={characters} />
    </section>
  );
};

export default TopCharacterSection;
