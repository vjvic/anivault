"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, Anime, fetchTopAnime } from "@/lib/api";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";
import SectionLoading from "@/components/home/SectionLoading";

const TopMovieSection = () => {
  const { data, isLoading, isError } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["topMovies"],
    queryFn: () => fetchTopAnime({ type: "movie", filter: "", page: 1 }),
  });

  if (isLoading) return <SectionLoading />;
  if (isError) return <div>Error fetching anime</div>;

  return (
    <section>
      <ShowcaseCarousel
        text="Top Movies"
        data={data?.data ?? []}
        link="/movie"
      />
    </section>
  );
};

export default TopMovieSection;
