import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, Anime, fetchTopAnime } from "@/lib/api";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";

const TopAnimeShowcase = () => {
  const { data } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["topAnime"],
    queryFn: () => fetchTopAnime({ type: "", filter: "", page: 1 }),
  });

  return (
    <div>
      <ShowcaseCarousel text="Top Anime" data={data?.data ?? []} />
    </div>
  );
};

export default TopAnimeShowcase;
