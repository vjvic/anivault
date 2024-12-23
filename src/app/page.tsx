"use client";
import React from "react";
import CarouselTop from "@/components/CarouselTop";
import HeroContent from "@/components/home/hero/HeroContent";
import { useQuery } from "@tanstack/react-query";
import {
  Anime,
  fetchTopAnime,
  fetchTopCharacters,
  AnimeResponse,
} from "@/lib/api";
import GridList from "@/components/GridList";

const Home = () => {
  const { data: topAnime } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["topAnime"],
    queryFn: () => fetchTopAnime({ type: "", filter: "", page: 1 }),
  });

  const { data: topMovies } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["topMovies"],
    queryFn: () => fetchTopAnime({ type: "movie", filter: "", page: 1 }),
  });

  const { data: topCharacters } = useQuery({
    queryKey: ["topCharacters"],
    queryFn: fetchTopCharacters,
  });

  console.log("top character");
  console.log(topCharacters);

  return (
    <div>
      <HeroContent />
      <CarouselTop text="Top Anime" data={topAnime?.data ?? []} />
      <CarouselTop text="Top Movie" data={topMovies?.data ?? []} />
      <GridList text="Top Character" data={topCharacters?.data ?? []} />
    </div>
  );
};

export default Home;
