import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, Anime, fetchTopAnime } from "@/lib/api";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";

const TopAnimeSection = () => {
  const { data } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["topAnime"],
    queryFn: () => fetchTopAnime({ type: "", filter: "", page: 1 }),
  });

  return (
    <section>
      <ShowcaseCarousel text="Top Anime" data={data?.data ?? []} link="/" />
    </section>
  );
};

export default TopAnimeSection;
