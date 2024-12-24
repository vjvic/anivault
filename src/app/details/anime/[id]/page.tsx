"use client";
import { useParams } from "next/navigation";
import HeroSection from "@/components/details/anime/HeroSection";
import CharacterListSection from "@/components/details/characters/CharacterListSection";

const AnimeDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <HeroSection id={Number(id)} />
      <CharacterListSection id={Number(id)} />
    </div>
  );
};

export default AnimeDetails;
