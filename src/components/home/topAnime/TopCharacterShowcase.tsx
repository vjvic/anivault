import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, Characters, fetchTopCharacters } from "@/lib/api";
import ShowcaseCharacters from "@/components/ShowcaseCharacters";

const TopCharacterShowcase = () => {
  const { data } = useQuery<AnimeResponse<Characters>>({
    queryKey: ["topCharacters"],
    queryFn: fetchTopCharacters,
  });
  return (
    <div>
      <ShowcaseCharacters text="Top Character" data={data?.data ?? []} />
    </div>
  );
};

export default TopCharacterShowcase;
