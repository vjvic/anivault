"use client";
import React from "react";
import { useParams } from "next/navigation";
import HeroSection from "@/components/details/anime/HeroSection";
import CharacterList from "@/components/details/characters/CharacterList";

const AnimeDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <HeroSection id={Number(id)} />
      <CharacterList id={Number(id)} />
    </div>
  );
};

export default AnimeDetails;
