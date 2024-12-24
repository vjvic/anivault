import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, Anime, fetchTopAnime } from "@/lib/api";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";

const TopMovieSection = () => {
  const { data } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["topMovies"],
    queryFn: () => fetchTopAnime({ type: "movie", filter: "", page: 1 }),
  });

  return (
    <section>
      <ShowcaseCarousel text="Top Movie" data={data?.data ?? []} />
    </section>
  );
};

export default TopMovieSection;
