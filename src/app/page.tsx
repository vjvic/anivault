"use client";
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import TopAnimeSection from "@/components/home/topAnime/TopAnimeSection";
import TopMovieSection from "@/components/home/topAnime/TopMovieSection";
import TopCharacterSection from "@/components/home/topAnime/TopCharacterSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <TopAnimeSection />
      <TopMovieSection />
      <TopCharacterSection />
    </div>
  );
};

export default Home;
