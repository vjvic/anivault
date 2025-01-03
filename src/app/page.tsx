import React from "react";
import HeroSection from "@/components/home/HeroSection";
import TopAnimeSection from "@/components/home/topAnime/TopAnimeSection";
import TopMovieSection from "@/components/home/topAnime/TopMovieSection";
import TopCharacterSection from "@/components/home/topAnime/TopCharacterSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to AniVault - Discover Anime, Movies, Characters",
  description:
    "Discover the best anime, movies, and top characters on AniVault. Stay updated with the latest and most popular anime recommendations.",
  keywords:
    "anime, movies, top anime, top characters, AniVault, anime recommendations",
};

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
