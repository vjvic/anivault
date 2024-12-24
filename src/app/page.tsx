"use client";
import React from "react";
import HeroContent from "@/components/home/hero/HeroContent";
import TopAnimeShowcase from "@/components/home/topAnime/TopAnimeShowcase";
import TopMovieShowcase from "@/components/home/topAnime/TopMovieShowcase";
import TopCharacterShowcase from "@/components/home/topAnime/TopCharacterShowcase";

const Home = () => {
  return (
    <div>
      <HeroContent />
      <TopAnimeShowcase />
      <TopMovieShowcase />
      <TopCharacterShowcase />
    </div>
  );
};

export default Home;
