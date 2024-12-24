import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, Anime, fetchTopAnime } from "@/lib/api";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";

const TopMovieShowcase = () => {
  const { data } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["topMovies"],
    queryFn: () => fetchTopAnime({ type: "movie", filter: "", page: 1 }),
  });

  return (
    <div>
      <ShowcaseCarousel text="Top Movie" data={data?.data ?? []} />
    </div>
  );
};

export default TopMovieShowcase;
